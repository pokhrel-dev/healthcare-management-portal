from rest_framework import generics, viewsets, status
from rest_framework.response import Response 
from django.contrib.auth.models import User 
from .models import Doctor, Appointment, Patient
from .serializers import DoctorSerializer, AppointmentSerializer, PatientSerializer
from rest_framework.permissions import AllowAny

# --- DOCTOR VIEWS ---
class DoctorListView(generics.ListAPIView):
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer

# --- APPOINTMENT VIEWS ---
class AppointmentListCreateView(generics.ListCreateAPIView):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer

class AppointmentDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer

# --- PATIENT & REGISTRATION VIEWS ---
class PatientViewSet(viewsets.ModelViewSet):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer

    def create(self, request, *args, **kwargs):
        # 1. Capture data from the Maryland-based frontend
        name = request.data.get('name')
        password = request.data.get('password')

        if not name or not password:
            return Response({"error": "Name and password are required"}, status=status.HTTP_400_BAD_REQUEST)

        # 2. Create the actual Django User for login
        if not User.objects.filter(username=name).exists():
            User.objects.create_user(username=name, password=password)
        
        # 3. Create the Patient record in RDS
        return super().create(request, *args, **kwargs)

    def get_permissions(self):
        if self.action == 'create':
            return [AllowAny()]
        return super().get_permissions()