"use client"
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import Image from "next/image";
import {BiSolidCamera} from "react-icons/bi";
import {HiOutlineMail, HiOutlineDeviceMobile} from "react-icons/hi";
import { useState } from 'react';
import { CropperRef, Cropper, CircleStencil } from 'react-advanced-cropper';
import 'react-advanced-cropper/dist/style.css'
import Logo from "@/public/img/logo.webp";

export default function Page()
{
    const [image] = useState(
        Logo.src,
    );

    return (
        <div className="mx-auto w-[400px] max-w-full">
            {/* <Cropper
                src={image}
                className={'cropper'}
                stencilComponent={CircleStencil}
            /> */}

            <section className="relative w-[250px] aspect-square mx-auto max-w-full">
                <Image className="rounded-full object-cover" src="https://api-encuentratumascota.nijui.com/users/1/profile.webp" width="600" height="600" alt="Lechonk aesthetic" />
                <button className="absolute bottom-5 right-5 text-2xl text-white bg-pink-500 rounded-full p-1">
                    <BiSolidCamera/>
                </button>
            </section>
            <section className="flex flex-col gap-3">
                <div>
                    <div className="text-center">
                        <h1 className="text-2xl font-bold leading-none">name</h1>
                        <span>username</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <HiOutlineMail/> 
                        <span>Correo: email</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <HiOutlineDeviceMobile/> 
                        <span>Celular: mobile</span>
                    </div>
                </div>
                <Button className="bg-primary text-white" v>Editar</Button>
            </section>

            <section>
                <form action="" className="flex flex-col gap-3">
                    <Input type="text" label="Nombre" isRequired={false}/>
                    <Input type="text" label="Usuario"/>
                    {/* <Input type="text" label="Correo" isRequired={false}/> */}
                    <Input type="text" label="Móvil" isRequired={false}/>
                    <div className="flex gap-2 w-full child:w-1/2">
                        <Button type="button" className="">Cancelar</Button>
                        <Button type="submit" className="bg-primary text-white">Guardar</Button>
                    </div>
                </form>
            </section>
        </div>
    )
}