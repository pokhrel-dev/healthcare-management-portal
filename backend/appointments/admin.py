from django.contrib import admin
from .models import Patient, Doctor, Department, Appointment 

admin.site.register(Patient)
admin.site.register(Doctor)
admin.site.register(Department)

# REMOVE the old admin.site.register(Appointment) line!

@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = ('id', 'patient_name', 'appointment_date', 'doctor')