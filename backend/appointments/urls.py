from django.urls import path
from .views import (
    DoctorListView, 
    PatientListView, 
    AppointmentListCreateView, 
    AppointmentDetailView # Use this for Retrieve, Update, and Delete
)

urlpatterns = [
    path('doctors/', DoctorListView.as_view(), name='doctor-list'),
    path('patients/', PatientListView.as_view(), name='patient-list'),
    path('book/', AppointmentListCreateView.as_view(), name='appointment-list-create'),
    
    # THIS IS THE MISSING LINK: It allows the DELETE method for a specific ID
    path('book/<int:pk>/', AppointmentDetailView.as_view(), name='appointment-detail'),
]