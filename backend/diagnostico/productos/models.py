from django.db import models

# Create your models here.


class Producto(models.Model):

    nombre = models.CharField(max_length=200)
    descripcion = models.CharField(max_length=200)
    precio = models.FloatField()
    stock = models.IntegerField()
    imagen = models.ImageField(upload_to='productos/', blank=True, null=True)

    def __str__(self):
        
        return self.nombre