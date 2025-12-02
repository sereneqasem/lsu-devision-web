
from django.urls import path
from .views import SubmitPredictionView, PredictionResultView, export_settings, RegisterView, user_info
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('predict/', SubmitPredictionView.as_view(), name='submit-prediction'),
    path('predict/status/<uuid:task_id>/', PredictionResultView.as_view(), name='prediction-status'),
    path('settings/export', export_settings, name='export_settings'),
    path('auth/register/', RegisterView.as_view(), name='auth-register'),
    path('auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/user/', user_info, name='auth-user'),
]