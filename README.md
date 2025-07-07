# models.py
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone

class University(models.Model):
    name = models.CharField(max_length=100, unique=True)
    university_code = models.CharField(max_length=10, unique=True)
    created_at = models.DateTimeField(default=timezone.now)
    
    # Add other university-specific fields
    def __str__(self):
        return self.name

class CustomUser(AbstractUser):
    ROLE_CHOICES = (
        ('creator', 'Creator'),
        ('admin', 'University Admin'),
        ('teacher', 'Teacher'),
        ('student', 'Student'),
    )
    
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)
    university = models.ForeignKey(University, on_delete=models.CASCADE, null=True, blank=True)
    phone = models.CharField(max_length=15, blank=True)
    requires_2fa = models.BooleanField(default=False)
    
    # Security flags
    is_verified = models.BooleanField(default=False)
    last_security_scan = models.DateTimeField(null=True)

class Course(models.Model):
    title = models.CharField(max_length=200)
    code = models.CharField(max_length=20)
    university = models.ForeignKey(University, on_delete=models.CASCADE)
    teacher = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    description = models.TextField()
    
    def __str__(self):
        return f"{self.code} - {self.title}"

class Enrollment(models.Model):
    student = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    enrolled_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ('student', 'course')
# views.py
from django.contrib.auth.decorators import login_required, user_passes_test
from django.core.exceptions import PermissionDenied

def role_check(role):
    def check(user):
        return user.role == role
    return check

@login_required
@user_passes_test(role_check('creator'))
def creator_dashboard(request):
    # Only accessible to creator
    universities = University.objects.all()
    return render(request, 'creator_dashboard.html', {'universities': universities})

@login_required
def university_portal(request):
    if not request.user.university:
        raise PermissionDenied
    # University-specific content filtering
    courses = Course.objects.filter(university=request.user.university)
    return render(request, 'university_portal.html', {'courses': courses})

@login_required
def student_dashboard(request):
    if request.user.role != 'student':
        raise PermissionDenied
    enrollments = Enrollment.objects.filter(student=request.user)
    return render(request, 'student_dashboard.html', {'enrollments': enrollments})
# security.py - Custom security middleware
from django.http import HttpResponseForbidden
from django.utils.deprecation import MiddlewareMixin

class UniversityAccessMiddleware(MiddlewareMixin):
    def process_request(self, request):
        if request.user.is_authenticated and request.user.university:
            # Validate university access for all university-scoped URLs
            if '/university/' in request.path:
                university_id = request.path.split('/')[2]
                if str(request.user.university.id) != university_id:
                    return HttpResponseForbidden()# urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('creator/dashboard/', views.creator_dashboard, name='creator_dashboard'),
    path('university/<int:university_id>/', views.university_portal, name='university_portal'),
    path('student/dashboard/', views.student_dashboard, name='student_dashboard'),
    
    # Authentication paths
    path('signup/', views.signup_view, name='signup'),
    path('creator/signup/', views.creator_signup, name='creator_signup'),
    path('login/', views.login_view, name='login'),
    
    # Transaction paths
    path('payment/cbe/', views.cbe_payment, name='cbe_payment'),
    path('payment/dashen/', views.dashen_payment, name='dashen_payment'),
]<!-- Sample template: university_portal.html -->
{% extends 'base.html' %}

{% block content %}
<div class="university-header">
  <h1>{{ request.user.university.name }} Portal</h1>
  <!-- University-specific logo would go here -->
</div>

<div class="role-section">
  {% if request.user.role == 'teacher' %}
    <!-- Teacher view components -->
    <div class="teacher-tools">
      <button>Create Course</button>
      <button>Grade Submissions</button>
    </div>
  
  {% elif request.user.role == 'student' %}
    <!-- Student view components -->
    <div class="student-actions">
      <button>Enroll in Courses</button>
      <button>View Grades</button>
      <button>Request Assessment</button>
    </div>
  {% endif %}
</div>
{% endblock %}
                    
# Additional views for transactions, assessments, etc
# Additional models for assessments, transactions, etc would go here 
