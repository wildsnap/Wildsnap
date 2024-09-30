from django.urls import path
from .views import predict_image

urlpatterns = [
    path('predict/', predict_image, name='predict_image'),
]