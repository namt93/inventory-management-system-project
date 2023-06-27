from pickle import ADDITEMS
import serial
import threading
import socket
from pynput import keyboard

HEADER = 64
PORT = 5050
SERVER = socket.gethostbyname(socket.gethostname())
ADDRESS = (SERVER, PORT)
FORMAT_STRING = 'utf-8'
DISCONNECT_MESSAGE = "DISCONNECT"

class ComputerIPC:
    def __init__(self, port='COM2', baudrate=9600, timeout=None):
        self.ser = None
        self.server = None
        self.port = port
        self.baudrate = baudrate
        self.timeout = timeout
        self.is_running_server = False
        self.is_run = False
        self.current_keys=[]
        self.listen = keyboard.Listener

    def __init_server(self):
        print("hihi")
        self.server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.server.bind(ADDRESS)

    def __init_serial(self):
        print("hihi")
        if self.ser is None:
            self.ser = serial.Serial(timeout=self.timeout)
        if self.ser.is_open:
            self.ser.close()
        self.ser.baudrate = self.baudrate
        self.ser.port = self.port
        self.ser.open()

    def handle_client_message(self, conn, address):
        pass
    
    def server_listening(self):
        print(SERVER)
        while self.is_running_server:
            conn, address = self.server.accept()
            self.handle_client_message(conn, address)
            if not self.is_running_server:
                break
        self.listen.stop()

    def start(self):
        self.__init_serial()
        self.is_running_server = True 
        self.__init_server()
        self.is_run = True

        
    def read_serial(self):
        while self.is_run:
            self.start()
            line = self.ser.readline().decode('utf-8').replace('\n','')
            print(line)

            if not self.is_run:
                break
        self.listen.stop()



    def execute_stopRunning(self):
        print('Stop running')
        self.is_run = False
        self.is_running_server = False

    
    def send_operationMessage(self):
        print('hihi')
        if self.current_keys[0] == 79 and len(self.current_keys) > 1:
            if self.current_keys[1] < 51 and len(self.current_keys) == 3:
                message = 'O|' + str(self.current_keys[1] - 48) + '|' + str(self.current_keys[2] - 48)
                self.ser.write((message + '\n').encode('utf-8'))
                self.current_keys = []
            elif self.current_keys[1] == 51 and len(self.current_keys) == 2:
                message = 'O|' + str(self.current_keys[1] - 48)
                self.ser.write((message + '\n').encode('utf-8'))
                self.current_keys = []

    def send_operationMessage_from_server(self, message):
        print('hihi')
        self.ser.write((message + '\n').encode('utf-8'))


    def determine_shortcuts(self, vk):
        if vk == 27:
            self.execute_stopRunning()
            return
#        elif vk == 69 and not self.is_error:
#            self.is_error = True
#
#            # Breakdown thread
#            brkdown_thread = threading.Thread(target=self.run_masterControllerBreakdownState, args=(6,))
#            brkdown_thread.start()
#
#        elif self.current_keys[0] == 69:
#            self.determine_errorInformation()
#
#        elif vk == 79:
#
#            # Send operation message thread
#            send_opr_message_thread = threading.Thread(target=self.send_operationMessage, args=())
#            send_opr_message_thread.start()

        elif self.current_keys[0] == 79:
            self.send_operationMessage()


    def on_press(self, key):
        vk = key.vk if hasattr(key, 'vk') else key.value.vk
        print('vk: ', vk)
        self.current_keys.append(vk)
        print('keys: ', self.current_keys)
        if vk == None:
            return
        self.determine_shortcuts(vk)


    def run_computerIPC(self):
        self.start()
        print('Start computer successfully!!')

        print('---->', self.server)
        if self.server:
            self.server.listen()
            print("[LISTENING] Server  is listening")

        # Server listening thread
        server_listening_thread = threading.Thread(target=self.server_listening, args=())
        server_listening_thread.start()

        # Environment thread
        env_thread = threading.Thread(target=self.read_serial, args=())
        env_thread.start()


        with keyboard.Listener(on_press=self.on_press) as listener:
            self.listen = listener
            listener.join()

if __name__ == '__main__':
    HihiController = ComputerIPC(timeout=12)
    HihiController.run_computerIPC()
