from django.contrib import admin
from .models import *


# Register your models here.
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user','completed_modules','content_library','skill_level','quiz_history','streak_days','total_points','target_completion_date')
        
class StudentDataAdmin(admin.ModelAdmin):
    list_display = ('user', 'age', 'grade', 'education_background', 'difficulty_preference', 
                    'feedback_preference', 'current_skill_level', 'study_environment', 
                    'learning_challenges', 'learning_style', 'motivation', 
                    'study_time', 'primary_goal', 'short_term_goal', 
                    'long_term_goal', 'study_days', 'subjects', 
                    'target_completion_date')
    # Customize the admin interface
    list_filter = ('user', 'age', 'subjects', 'grade', )  # Filter by user and date
    search_fields = ('user__username',)  # Allow searching by username
    ordering = ['user', 'age']
    

admin.site.register(UserProfile, UserProfileAdmin)
admin.site.register(StudentData,StudentDataAdmin) 