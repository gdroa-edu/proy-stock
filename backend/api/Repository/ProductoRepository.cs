using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Producto;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class ProductoRepository : IProductoRepository
    {
        private readonly ApplicationDbContext _context;
        public ProductoRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<Producto> CreateAsync(Producto productoModel)
        {
            await _context.productos.AddAsync(productoModel);
            await _context.SaveChangesAsync();
            return productoModel;
        }

        public async Task<Producto?> DeleteAsync(int id)
        {
            var productoModel = await _context.productos.FirstOrDefaultAsync(p => p.Id == id);
            if(productoModel == null) return null;

            _context.productos.Remove(productoModel);
            await _context.SaveChangesAsync();
            return productoModel;
        }

        public async Task<List<Producto>> GetAllAsync()
        {
            return await _context.productos
            .Include(p => p.DetallesDeMovimientos)
            .Include(p => p.Deposito)
            .Include(p => p.Proveedor)
            .Include(p => p.Marca)
            .ToListAsync();
        }

        public async Task<Producto?> GetByIdAsync(int id)
        {
            return await _context.productos
            .Include(p => p.DetallesDeMovimientos)
            .Include(p => p.Deposito)
            .Include(p => p.Proveedor)
            .Include(p => p.Marca)
            .FirstOrDefaultAsync(i => i.Id == id);
        }

        public async Task<Producto?> GetByNombreAsync(string nombre)
        {
            return await _context.productos.FirstOrDefaultAsync(s => s.Str_nombre == nombre);
        }

        public async Task<bool> ProductoExists(int id)
        {
            return await _context.productos.AnyAsync(s => s.Id == id);
        }

        public async Task<Producto?> UpdateAsync(int id, Producto productoDto)
        {
            var productoExistente = await _context.productos.FirstOrDefaultAsync(s => s.Id == id);
            if(productoExistente == null) return null;

            productoExistente.Str_ruta_imagen = productoDto.Str_ruta_imagen;
            productoExistente.Str_nombre = productoDto.Str_nombre;
            productoExistente.Str_descripcion = productoDto.Str_descripcion;
            productoExistente.Int_cantidad_actual = productoDto.Int_cantidad_actual;
            productoExistente.Int_cantidad_minima = productoDto.Int_cantidad_minima;
            productoExistente.Dec_costo_PPP = productoDto.Dec_costo_PPP;
            productoExistente.Int_iva = productoDto.Int_iva;
            productoExistente.Dec_precio_mayorista = productoDto.Dec_precio_mayorista;
            productoExistente.Dec_precio_minorista = productoDto.Dec_precio_minorista;

            await _context.SaveChangesAsync();
            return productoExistente;
        }
    }
}