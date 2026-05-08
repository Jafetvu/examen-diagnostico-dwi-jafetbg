from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Producto
from .serializers import ProductoSerializer

class ProductoViewSet(viewsets.ModelViewSet):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer

# Create your views here.
