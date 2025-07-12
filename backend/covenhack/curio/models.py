from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    completed_modules = models.CharField(max_length=100, null=True, blank=True)
    content_library = models.CharField(max_length=100, null=True, blank=True)
    skill_level = models.CharField(max_length=100, null=True, blank=True)
    quiz_history = models.CharField(max_length=100, null=True, blank=True)
    streak_days = models.IntegerField(null=True, blank=True) 
    total_points = models.IntegerField(null=True, blank=True)
    target_completion_date = models.DateField(null=True, blank=True) 
    def __str__(self):
        return f"Tokens for {self.user.username}"
    
class StudentData(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    age = models.IntegerField(null=True, blank=True)
    grade = models.CharField(max_length=100, null=True, blank=True)
    education_background = models.CharField(max_length=100, null=True, blank=True)
    difficulty_preference = models.CharField(max_length=100, null=True, blank=True) 
    feedback_preference = models.CharField(max_length=100, null=True, blank=True)
    current_skill_level = models.CharField(max_length=100, null=True, blank=True)
    study_environment = models.CharField(max_length=100, null=True, blank=True)
    learning_challenges = models.CharField(max_length=100, null=True, blank=True)
    learning_style = models.CharField(max_length=100, null=True, blank=True)
    motivation = models.CharField(max_length=100, null=True, blank=True)
    study_time = models.CharField(max_length=100, null=True, blank=True)
    primary_goal = models.CharField(max_length=100, null=True, blank=True)
    short_term_goal = models.CharField(max_length=100, null=True, blank=True)
    long_term_goal = models.CharField(max_length=100, null=True, blank=True)
    study_days = models.CharField(max_length=100, null=True, blank=True)
    subjects = models.CharField(max_length=100, null=True, blank=True)
    target_completion_date = models.DateField(null=True, blank=True)
  

    