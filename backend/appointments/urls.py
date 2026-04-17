from django.urls import path
from .views import (
    DoctorListView, 
    PatientListView, 
    AppointmentListCreateView, # <-- Ensure this matches views.py
    AppointmentDetailView
)

urlpatterns = [
    path('doctors/', DoctorListView.as_view(), name='doctor-list'),
    path('patients/', PatientListView.as_view(), name='patient-list'),
    path('book/', AppointmentListCreateView.as_view(), name='appointment-book'), #
    path('book/<int:pk>/', AppointmentDetailView.as_view(), name='appointment-detail'),
]