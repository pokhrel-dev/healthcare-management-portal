from django.db import models

# --- DEPARTMENT MODEL ---
# Execution: Acts as a lookup table to categorize doctors by their medical field.
class Department(models.Model):
    name = models.CharField(max_length=100)
    
    def __str__(self):
        return self.name

# --- DOCTOR MODEL ---
# Execution: Stores practitioner details. It uses a ForeignKey to link to a Department.
class Doctor(models.Model):
    name = models.CharField(max_length=100)
    department = models.ForeignKey(Department, on_delete=models.CASCADE)
    specialty = models.TextField()

    def __str__(self):
        return f"Dr. {self.name} ({self.department})"

# --- PATIENT MODEL ---
# Execution: Stores identity data. 
# FIX: Added 'null=True, blank=True' so your React "Sign Up" (which only sends a name) doesn't fail.
class Patient(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True, null=True, blank=True)
    phone = models.CharField(max_length=15, null=True, blank=True)

    def __str__(self):
        return self.name

# --- APPOINTMENT MODEL ---
# Execution: The transactional core of your system. Stores the link between a doctor and patient.
class Appointment(models.Model):
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    patient_name = models.CharField(max_length=100)
    # FIX: Changed 'auto_now_add=True' to a regular DateTimeField 
    # so it accepts the date/time you pick in the React UI.
    appointment_date = models.DateTimeField()

    def __str__(self):
        return f"{self.patient_name} with {self.doctor.name}"