from rest_framework import serializers
from .models import Doctor, Appointment, Patient, Department

# --- DOCTOR SERIALIZER ---
# Execution: Converts Doctor records into JSON. 
# Includes all fields: ID, Name, Department, and Specialty.
class DoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = '__all__'

# --- APPOINTMENT SERIALIZER ---
# Execution: Validates and converts booking data.
# Crucial for the 'POST' execution when you schedule a new visit in React.
class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = '__all__'

# --- PATIENT SERIALIZER ---
# Execution: Handles the conversion of patient data.
# Used during the 'Sign Up' process to create new records in PostgreSQL.
class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = '__all__'