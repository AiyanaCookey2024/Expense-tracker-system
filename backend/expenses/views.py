from django.shortcuts import render
from rest_framework import viewsets, permissions
from .serializers import ExpenseSerializer, SalaryPeriodSerializer
from .models import Expense, SalaryPeriod


# Create your views here.
class SalaryPeriodView(viewsets.ModelViewSet):
    serializer_class = SalaryPeriodSerializer
    queryset = SalaryPeriod.objects.all()

class ExpenseView(viewsets.ModelViewSet):
    serializer_class = ExpenseSerializer
    queryset = Expense.objects.all()