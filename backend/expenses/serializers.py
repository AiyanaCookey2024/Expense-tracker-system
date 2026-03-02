from rest_framework import serializers
from .models import Expense, SalaryPeriod
from django.db.models import Sum
from decimal import Decimal


class SalaryPeriodSerializer(serializers.ModelSerializer):
    remaining_balance = serializers.SerializerMethodField()

    class Meta:
        model = SalaryPeriod
        fields = "__all__"
    
    def get_remaining_balance(self, obj):
        total_spent = obj.expenses.aggregate(total=Sum('amount'))['total'] or Decimal('0.00')
        return obj.total_salary - total_spent

class ExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expense
        fields = "__all__"

    def validate(self, data):
        salary_period = data.get('salary_period')
        amount = data["amount"]
        
        if not salary_period:
            raise serializers.ValidationError("Salary period is required.")
        
        total_spent = salary_period.expenses.aggregate(total=Sum('amount'))['total'] or Decimal('0.00')
        if total_spent + amount > salary_period.total_salary:
            raise serializers.ValidationError("Total expenses exceed the salary for this period.")
        return data

    