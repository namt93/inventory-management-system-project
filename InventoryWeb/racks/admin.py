from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Rack, RackGroup, User, Document, Borrowing


class RackAdmin(admin.ModelAdmin):
    list_display = ["id", "rack_name", "rack_group", "user", "created_at"]
    search_fields = ["rack_name", 
                     "rack_group__location", 
                     "rack_group__description", 
                     "user__username"]
    list_filter = ["rack_name", "rack_group__location"]


class RackInline(admin.StackedInline):
    model = Rack
    pk_name = 'rack_group'

class RackGroupAdmin(admin.ModelAdmin):
    list_display = ["id", "location", "description", "user", "created_at"]
    search_fields = ["location", "description", "user__username"]
    list_filter = ["location"]

    inlines = (RackInline, )

class DocumentAdmin(admin.ModelAdmin):
    list_display = ["id", "title", "author", "rack", "manager"]
    search_fields = ["title", "author", "manager__username"]
    list_filter = ["id", "title"]


class BorrowingAdmin(admin.ModelAdmin):
    list_display = ["id", "borrower", "date_borrowed"]
    search_fields = ["borrower__username", "document__title"]
    list_filter = ["id"]


# Register your models here.
admin.site.register(Rack, RackAdmin)
admin.site.register(RackGroup, RackGroupAdmin)
admin.site.register(User, UserAdmin)
admin.site.register(Document, DocumentAdmin)
admin.site.register(Borrowing, BorrowingAdmin)