using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.Dtos.DetalleDeMovimiento
{
    public class DetalleDeMovimientoDto
    {
        public int Id { get; set; }
        public int Int_cantidad { get; set; }
        public int? MovimientoId { get; set; }
        public int? ProductoId { get; set; }
    }
}