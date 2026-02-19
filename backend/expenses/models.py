from django.db import models


# Create your models here.


class Expense(models.Model):

    CATEGORY_CHOICES = [
        ('FOOD', 'Food'),
        ('TRANSPORT','Transport'),
        ('ENTERTAINMENT', 'Entertainment'),
        ('BILLS', 'Bills'),
        ('OTHER', 'Other'),
    ]
    title = models.CharField(max_length=120)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    completed = models.BooleanField(default=False)


    def __str__(self):
        return f"self.title - £{self.amount}"