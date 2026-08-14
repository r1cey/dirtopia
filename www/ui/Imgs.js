import{ imgdir }	from "./UI.js"

import itemTps	from "../items/itemTps.js"


export default class I
{
	ui

	o	={}


	constructor( ui )
	{
		this.ui	=ui

		// const dir	='./imgs/'

		const fns	=
		[
			'leaves5.png' ,
			"sand3.png" ,
			"cactus.png",
			"hands.png"
		]
		const shadows	=
		{
			"leaves5" :1
		}
		for(var fn of fns )
		{
			const img	=new Image()

			const name	=fn.slice(0,fn.lastIndexOf('.'))

			if( shadows[name] )
			{
				img.onload	=()=>
				{
					const can	=document.createElement("canvas")

					const ctx	=can.getContext("2d")

					can.width	=img.width

					can.height	=img.height

					ctx.drawImage( img, 0,0 )

					const imgdata	=ctx.getImageData( 0,0, img.width, img.height )
					
					const arr	=imgdata.data

					for(var i =0 ;i< arr.length ;i +=4 )
					{
						arr[i]	=arr[i+1]	=arr[i+2]	=0
					}
					ctx.putImageData( imgdata, 0,0 )

					this.o[name+"_sh"]	=can
				}
			}
			img.src	=imgdir+fn

			this.o[name]	=img
		}
		for(var key in itemTps )
		{
			const img	=new Image()

			img.src	=imgdir+"items/"+key+".png"

			this.o[key]	=img
		}
	}
}