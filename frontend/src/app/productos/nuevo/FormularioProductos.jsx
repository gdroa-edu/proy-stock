"use client";
import React, { useEffect, useState } from 'react';
import { Button, NumberInput, TextInput, Select, SelectItem } from '@tremor/react';
import { useRouter } from 'next/navigation';
import ProveedoresConfig from '../../proveedores/ProveedoresConfig';
import MarcasConfig from '../../marcas/MarcasConfig';
import DepositosConfig from '../../depositos/DepositosConfig';
import ProductosConfig from '../ProductosConfig';

export default function FormularioProductos() {
  // Definimos el estado para cada campo del formulario
  const [str_imagen, setStr_imagen] = useState('');
  const [str_nombre, setStr_nombre] = useState('');
  const [str_descripcion, setStr_descripcion] = useState('');
  //const [fk_marca, setFk_marca] = useState('');
  //const [fk_categoria, setFk_categoria] = useState(''); // no se tiene categoria en el api
  //const [fk_proveedor, setFk_proveedor] = useState('');
  const [int_cantidad_actual, setInt_cantidad_actual] = useState(0);
  const [int_cantidad_minima, setInt_cantidad_minima] = useState(0);
  const [dc_costo_PPP, setDc_costo_PPP] = useState(0);
  const [int_iva, setInt_iva] = useState(0);
  const [dc_precio_mayorista, setDc_precio_mayorista] = useState(0);
  const [dc_precio_minorista, setDc_precio_minorista] = useState(0);
  //const [fk_deposito, setFk_deposito] = useState(0);

  const [fk_proveedor, setFk_proveedor] = useState(0);
  const [proveedores, setProveedores] = useState([]);
  useEffect(() => {
    const extraccionProveedores = async () => {
      try {
        const respuestaProveedores = await ProveedoresConfig.getProveedor();
        setProveedores(respuestaProveedores.data);
      } catch (error) {
        console.error('Error al obtener lista de proveedores: ', error);
      }
    }
    extraccionProveedores();
  }, []);

  const [fk_marca, setFk_marca] = useState(0);
  const [marcas, setMarcas] = useState([]);
  useEffect(() => {
    const extraccionMarcas = async () => {
      try {
        const respuestaMarcas = await MarcasConfig.getMarca();
        setMarcas(respuestaMarcas.data);
      } catch (error) {
        console.error('Error al obtener lista de marcas: ', error);
      }
    }
    extraccionMarcas();
  }, []);

  const [fk_deposito, setFk_deposito] = useState(0);
  const [depositos, setDepositos] = useState([]);
  useEffect(() => {
    const extraccionDepositos = async () => {
      try {
        const respuestaDepositos = await DepositosConfig.getDeposito();
        setDepositos(respuestaDepositos.data);
      } catch (error) {
        console.error('Error al obtener lista de marcas: ', error);
      }
    }
    extraccionDepositos();
  }, []);



  // Función para manejar el envío del formulario
  const router = useRouter();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Aquí podrías realizar alguna acción con los datos del formulario, como enviarlos a un servidor
      console.log({
        str_imagen,
        str_nombre,
        str_descripcion,
        fk_marca,
        //fk_categoria,
        fk_proveedor,
        int_cantidad_actual,
        int_cantidad_minima,
        dc_costo_PPP,
        int_iva,
        dc_precio_mayorista,
        dc_precio_minorista,
        fk_deposito
      });

      const producto = {
        "str_ruta_imagen": str_imagen,
        "str_nombre": str_nombre,
        "str_descripcion": str_descripcion,
        "int_cantidad_actual": int_cantidad_actual,
        "int_cantidad_minima": int_cantidad_minima,
        "dec_costo_PPP": dc_costo_PPP,
        "int_iva": int_iva,
        "dec_precio_mayorista": dc_precio_mayorista,
        "dec_precio_minorista": dc_precio_minorista
      }

      const productoAgregado = await ProductosConfig.createProducto(1, fk_proveedor, fk_marca, producto);
      // También puedes reiniciar los valores de los campos del formulario
      setStr_imagen('');
      setStr_nombre('');
      setStr_descripcion('');
      setFk_marca(0);
      //setFk_categoria('');
      setFk_proveedor(0);
      setInt_cantidad_actual(0);
      setInt_cantidad_minima(0);
      setDc_costo_PPP(0);
      setInt_iva(0);
      setDc_precio_mayorista(0);
      setDc_precio_minorista(0);
      setFk_deposito(0);
    } catch (error) {
      console.error('Error al enviar los datos del formulario: ', error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>

      <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6">
        <div className="col-span-full sm:col-span-3">
          <label
            htmlFor="str_imagen"
            className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
          >
            Imagen
            <span className="text-red-500">*</span>
          </label>
          <TextInput
            type="text"
            id="str_imagen"
            name="str_imagen"
            autoComplete="str_imagen"
            placeholder="Imagen"
            className="mt-2"
            value={str_imagen}
            onChange={(e) => setStr_imagen(e.target.value)}
            required
          />
        </div>

        <div className="col-span-full sm:col-span-3">
          <label
            htmlFor="str_nombre"
            className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
          >
            Nombre
            <span className="text-red-500">*</span>
          </label>
          <TextInput
            type="text"
            id="str_nombre"
            name="str_nombre"
            autoComplete="str_nombre"
            placeholder="nombre"
            className="mt-2"
            value={str_nombre}
            onChange={(e) => setStr_nombre(e.target.value)}
            required
          />
        </div>

        <div className="col-span-full sm:col-span-3">
          <label
            htmlFor="str_descripcion"
            className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
          >
            Descripción
            <span className="text-red-500">*</span>
          </label>
          <TextInput
            type="text"
            id="str_descripcion"
            name="str_descripcion"
            autoComplete="str_descripcion"
            placeholder="Descripción"
            className="mt-2"
            value={str_descripcion}
            onChange={(e) => setStr_descripcion(e.target.value)}
            required
          />
        </div>

        <div className="col-span-full sm:col-span-3">
          <label
            htmlFor="fk_marca"
            className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
          >
            Marca
            <span className="text-red-500">*</span>
          </label>
          <select id="fk_marca" value={fk_marca} onChange={(e) => setFk_marca(parseInt(e.target.value))}>
            <option value={0}>Seleccionar Marca</option>
            {marcas.map(marca => (
              <option key={marca.id} value={marca.id}>{marca.str_nombre}</option>
            ))}
          </select>

          {/*<Select id="fk_marca" value={fk_marca} placeholder="Seleccionar Marca" onValueChange={(e) => setFk_marca((e.target.value))}>
            {marcas.map(marca => (
              <SelectItem key={marca.id} value={marca.id}>{marca.str_nombre}</SelectItem>
            ))}
          </Select>*/}
        </div>

        {/* <div className="col-span-full sm:col-span-3"> 
          <label
            htmlFor="fk_categoria"
            className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
          >
            Categoria
            <span className="text-red-500">*</span>
          </label>
          <TextInput
            type="text"
            id="fk_categoria"
            name="fk_categoria"
            autoComplete="fk_categoria"
            placeholder="Categoria"
            className="mt-2"
            value={fk_categoria}
            onChange={(e) => setFk_categoria(e.target.value)}
            required
          />
        </div>*/}

        <div className="col-span-full sm:col-span-3">
          <label
            htmlFor="fk_proveedor"
            className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
          >
            Proveedor
            <span className="text-red-500">*</span>
          </label>
          <select id="fk_proveedor" value={fk_proveedor} onChange={(e) => setFk_proveedor(parseInt(e.target.value))}>
            <option value={0}>Seleccionar proveedor</option>
            {proveedores.map(proveedor => (
              <option key={proveedor.id} value={proveedor.id}>{proveedor.str_nombre}</option>
            ))}
          </select>
          {/*<Select id="fk_proveedor" value={fk_proveedor} placeholder='Seleccionar Proveedor' onValueChange={(e) => setFk_proveedor(parseInt(e.target.value))}>
            {proveedores.map(proveedor => (
              <SelectItem key={proveedor.id} value={proveedor.id}>{proveedor.str_nombre}</SelectItem>
            ))}
          </Select>*/}
        </div>

        <div className="col-span-full sm:col-span-3">
          <label
            htmlFor="int_cantidad_actual"
            className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
          >
            Cantidad
            <span className="text-red-500">*</span>
          </label>
          <NumberInput
            type="number"
            id="int_cantidad_actual"
            name="int_cantidad_actual"
            autoComplete="int_cantidad_actual"
            placeholder="Cantidad"
            className="mt-2"
            value={int_cantidad_actual}
            min={0}
            onChange={(e) => setInt_cantidad_actual(e.target.value)}
            required
          />
        </div>

        <div className="col-span-full sm:col-span-3">
          <label
            htmlFor="int_cantidad_minima"
            className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
          >
            Cantidad Mínima
            <span className="text-red-500">*</span>
          </label>
          <NumberInput
            type="number"
            id="int_cantidad_minima"
            name="int_cantidad_minima"
            autoComplete="int_cantidad_minima"
            placeholder="Cantidad Minima"
            className="mt-2"
            value={int_cantidad_minima}
            min={0}
            onChange={(e) => setInt_cantidad_minima(e.target.value)}
            required
          />
        </div>

        <div className="col-span-full sm:col-span-3">
          <label
            htmlFor="dc_costo_PPP"
            className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
          >
            Costo
            <span className="text-red-500">*</span>
          </label>
          <NumberInput enableStepper={false}
            id="dc_costo_PPP"
            name="dc_costo_PPP"
            autoComplete="dc_costo_PPP"
            placeholder="Gs."
            className="mt-2"
            value={dc_costo_PPP}
            min={0}
            onChange={(e) => setDc_costo_PPP(e.target.value)}
            required
          />
        </div>

        <div className="col-span-full sm:col-span-3">
          <label
            htmlFor="int_iva"
            className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
          >
            IVA
            <span className="text-red-500">*</span>
          </label>
          <NumberInput
            id="int_iva"
            name="int_iva"
            autoComplete="int_iva"
            value={int_iva}
            min={0}
            placeholder="IVA %"
            className="mt-2"
            onChange={(e) => setInt_iva(e.target.value)}
            required
          />
        </div>

        <div className="col-span-full sm:col-span-3">
          <label
            htmlFor="dc_precio_mayorista"
            className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
          >
            Precio Mayorista
            <span className="text-red-500">*</span>
          </label>
          <NumberInput enableStepper={false}
            id="dc_precio_mayorista"
            name="dc_precio_mayorista"
            autoComplete="dc_precio_mayorista"
            placeholder="Precio Mayorista"
            className="mt-2"
            value={dc_precio_mayorista}
            min={0}
            onChange={(e) => setDc_precio_mayorista(e.target.value)}
            required
          />
        </div>

        <div className="col-span-full sm:col-span-3">
          <label
            htmlFor="dc_precio_minorista"
            className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
          >
            Precio Minorista
            <span className="text-red-500">*</span>
          </label>
          <NumberInput enableStepper={false}
            id="dc_precio_minorista"
            name="dc_precio_minorista"
            autoComplete="dc_precio_minorista"
            placeholder="Precio Minorista"
            className="mt-2"
            value={dc_precio_minorista}
            min={0}
            onChange={(e) => setDc_precio_minorista(e.target.value)}
            required
          />

           <div className="col-span-full sm:col-span-3">
            <label
              htmlFor="fk_deposito"
              className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
            >
              Depósito
              <span className="text-red-500">*</span>
            </label>

            <select id="fk_deposito" value={fk_deposito} onChange={(e) => setFk_deposito(e.target.value)}>
              <option value={0}>Seleccionar Depósito</option>
              {depositos.map(deposito => (
                <option key={deposito.id} value={deposito.id}>{deposito.str_nombre}</option>
              ))}
            </select>

            {/*  <Select id="fk_deposito" value={fk_deposito} placeholder='Seleccionar Depósito' onValueChange={(e) => setFk_deposito(1)}>

              {depositos.map(deposito => (
                <SelectItem key={deposito.id} value={deposito.id}>{deposito.str_nombre}</SelectItem>
              ))}
            </Select>*/}
          </div>

        </div>
      </div>




      <Button variant="primary" type="submit" color='blue'>Guardar</Button>
      <Button variant="secondary" type="button" color='blue' onClick={() => {
        // Lógica para descartar
        console.log("Formulario descartado");
        // Reiniciar los valores del formulario
        setStr_imagen('');
        setStr_nombre('');
        setStr_descripcion('');
        setFk_marca(0);
        //setFk_categoria(0);
        setFk_proveedor(0);
        setInt_cantidad_actual(0);
        setInt_cantidad_minima(0);
        setDc_costo_PPP(0);
        setInt_iva(0);
        setDc_precio_mayorista(0);
        setDc_precio_minorista(0);
        setFk_deposito(0);
        router.push('/productos');
      }}>Descartar</Button>
    </form>
  );
}