from django.shortcuts import render
from rest_framework import viewsets, permissions
from .serializers import ExpenseSerializer, SalaryPeriodSerializer, BudgetSerializer
from .models import Expense, SalaryPeriod, Budget


# Create your views here.
class BudgetView(viewsets.ModelViewSet):
    serializer_class = BudgetSerializer
    queryset = Budget.objects.all()
    permission_classes = [permissions.IsAuthenticated]

class SalaryPeriodView(viewsets.ModelViewSet):
    serializer_class = SalaryPeriodSerializer
    queryset = SalaryPeriod.objects.all()
    permission_classes = [permissions.IsAuthenticated]

class ExpenseView(viewsets.ModelViewSet):
    serializer_class = ExpenseSerializer
    queryset = Expense.objects.all()
    permission_classes = [permissions.IsAuthenticated]