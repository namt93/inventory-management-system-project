import time
import math
import serial
import threading
import random
from pynput import keyboard

MAX_RACK_NUMBER=6
MAX_TEMPERATURE=22
MIN_TEMPERATURE=20
MAX_HUMIDITY=80
MIN_HUMIDITY=40


RACK_MOVEMENT_SPEED = 4.0
RACK_WEIGHT = 80.0
RACK_MAX_DISPLACEMENT = 64.0

MASTER_CONTROLLER_IDLE_STATE = 'master_controller_idle_state'
MASTER_CONTROLLER_ENV_STATE = 'master_controller_env_state'
MASTER_CONTROLLER_OPR_STATE = 'master_controller_operation_state'
MASTER_CONTROLLER_BRKDOWN_STATE = 'master_controller_breakDown_state'


class MasterCom:
    def __init__(self, port='COM3', baudrate=9600, timeout=None):
        self.ser = None
        self.port = port
        self.baudrate = baudrate
        self.timeout = timeout
        self.is_run = False
        self.is_rack_operation = False
        self.is_error = False
        self.state = MASTER_CONTROLLER_IDLE_STATE
        self.listen = keyboard.Listener
        self.current_keys = []
        self.error_racks = [[] for i in range(MAX_RACK_NUMBER)]
        self.operating_racks_status = [[0.0, 0.0] for i in range(MAX_RACK_NUMBER)]
        self.operating_racks = []

    def __init_serial(self):
        if self.ser is None:
            self.ser = serial.Serial(timeout=self.timeout)
        if self.ser.is_open:
            self.ser.close()
        self.ser.baudrate = self.baudrate
        self.ser.port = self.port
        self.ser.open()

    def start(self):
        self.__init_serial()
        self.is_run = True

    def create_environmentStatusData(self):
        random_parameter = random.random()
        rack_id = random.randrange(MAX_RACK_NUMBER - 6, MAX_RACK_NUMBER)
        temperature = random_parameter * (MAX_TEMPERATURE - MIN_TEMPERATURE) + MIN_TEMPERATURE
        humidity = random_parameter * (MAX_HUMIDITY - MIN_HUMIDITY) + MIN_HUMIDITY
        return 'ENVSTT|'+str(rack_id+1) + '|' + str(temperature) + '|' + str(humidity)

    def create_operationStatusData(self, rack_id):
        operation_message = 'OPRSTT|' + str(rack_id+1)
        random_parameter = random.random()
        movement_speed = random_parameter * math.pow(-1, math.floor(random_parameter * 10)) + RACK_MOVEMENT_SPEED
        weight = random_parameter * 1.8 * math.pow(-1, math.floor(random_parameter * 10)) + RACK_WEIGHT
        is_hard_locked = 0
        displacement = self.operating_racks_status[rack_id][0] + movement_speed * 2
        is_endpoint = 0
        if self.operating_racks_status[rack_id][1] == 1:
            displacement = self.operating_racks_status[rack_id][0] - movement_speed * 2
        
        if displacement > RACK_MAX_DISPLACEMENT:
            displacement = RACK_MAX_DISPLACEMENT
            self.operating_racks_status[rack_id][1] = 1
        if displacement <= 0:
            self.operating_racks_status[rack_id][1] = 0
            is_endpoint = 1
            displacement = 0.0
            self.operating_racks.remove(rack_id)

            if not self.operating_racks:
                # set the is_rack_operation flag to False
                self.is_rack_operation = False
        self.operating_racks_status[rack_id][0] = displacement
        
        operation_message += '|' + str(movement_speed) + '|' + str(weight) + '|' + str(displacement) + '|' + str(is_hard_locked) + '|' + str(is_endpoint)

        return operation_message

    def create_breakdownStatusData(self, error_numbers, rack_id):
        error_message = 'BRKSTT|' + str(rack_id+1)
        for number in range(1,4):
            if number in error_numbers:
                error_message += '|1'
            else:
                error_message += '|0'
        return error_message

    def run_masterControllerEnvState(self, sleep_time):
        while self.is_run:
            self.state = MASTER_CONTROLLER_ENV_STATE
            print(f'state: {self.state}')
            message = self.create_environmentStatusData()
            self.ser.write((message + '\n').encode('utf-8'))
            # The is_run flag to break while loop (run_masterControllerEnvState thread)
            if not self.is_run:
                break
            time.sleep(sleep_time)
            self.state = MASTER_CONTROLLER_IDLE_STATE

            if not self.is_run:
                break
        self.listen.stop()

    def read_line_from_computerIPC(self):
        while self.is_run:
            line = self.ser.readline().decode('utf-8').replace('\n', '')
            print(line)

            if not self.is_run:
                break
        self.listen.stop()


    def run_masterControllerOperationState(self, sleep_time):
        while self.is_rack_operation:
            self.state = MASTER_CONTROLLER_OPR_STATE
            print(f'state: {self.state}')
            for idx in self.operating_racks:
                message = ''
                message += self.create_operationStatusData(idx)
                print(message)
                print(self.operating_racks)
                self.ser.write((message + '\n').encode('utf-8'))
            # The is_rack_operation flag to break run_masterControllerOperationState thread
            if not self.is_rack_operation:
                break
            time.sleep(sleep_time)
            self.state = MASTER_CONTROLLER_IDLE_STATE

            if not self.is_rack_operation:
                break
        

    def run_masterControllerBreakdownState(self, sleep_time):
        while self.is_error:
            self.state = MASTER_CONTROLLER_BRKDOWN_STATE
            print(f'state: {self.state}')
            for idx, elements in enumerate(self.error_racks):
                message = ''
                if elements:
                    message += self.create_breakdownStatusData(elements, idx)
                    print(message)
                    self.ser.write((message + '\n').encode('utf-8'))
            # The is_error flag to break run_masterControllerBreakdownState thread
            if not self.is_error:
                break
            time.sleep(sleep_time)
            self.state = MASTER_CONTROLLER_IDLE_STATE

            if not self.is_error:
                break

    def determine_errorInformation(self):
        print('haha')
        if len(self.current_keys) == 3 and self.current_keys[0] == 69:
            self.error_racks[self.current_keys[1] - 49].append(self.current_keys[2] - 48)
            print(self.error_racks)
            self.current_keys = []


    def determine_operationInformation(self):
        print('hihi')
        if len(self.current_keys) == 2 and self.current_keys[0] == 79:
            self.operating_racks.append(self.current_keys[1] - 49)
            print(self.operating_racks)
            self.current_keys = []

    def execute_stopRunning(self):
        print('Stop running')
        self.is_run = False
        self.is_error = False

    def determine_shortcuts(self, vk):
        if vk == 27:
            self.execute_stopRunning()
            return
        elif vk == 69 and not self.is_error:
            self.is_error = True

            # Breakdown thread
            brkdown_thread = threading.Thread(target=self.run_masterControllerBreakdownState, args=(6,))
            brkdown_thread.start()

        elif self.current_keys[0] == 69:
            self.determine_errorInformation()

        elif vk == 79 and not self.is_rack_operation:
            self.is_rack_operation = True

            # Operation status thread
            opr_thread = threading.Thread(target=self.run_masterControllerOperationState, args=(4,))
            opr_thread.start()

        elif self.current_keys[0] == 79:
            self.determine_operationInformation()

    def on_press(self, key):
        vk = key.vk if hasattr(key, 'vk') else key.value.vk
        print('vk: ', vk)
        self.current_keys.append(vk)
        print('keys: ', self.current_keys)
        if vk == None:
            return
        self.determine_shortcuts(vk)


    def run_masterController(self):
        self.start()
        print('Start controller successfully!!')

        # Environment thread
        env_thread = threading.Thread(target=self.run_masterControllerEnvState, args=(10,))
        env_thread.start()


        with keyboard.Listener(on_press=self.on_press) as listener:
            self.listen = listener
            listener.join()


if __name__ == '__main__':
    HahaController = MasterCom()
    HahaController.run_masterController()



