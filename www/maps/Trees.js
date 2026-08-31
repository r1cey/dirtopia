import newShTrM	from "../shared/maps/newTreesMap.js"
import Map	from './Map.js'
import newBinM from "../shared/maps/newBinMap.js"
import Gr from "./Ground.js"

import V	from "../shared/Vec.js"
import Col	from "../shared/Color.js"

import{ calc_bmap_typarrs }	from "../shared/maps/newBin.js"

import vegdefs	from "../shared/maps/plantdefs.js"



/** This Canopy class has additional bitmap storing helper data.
 * Like branch size which saves on calculation every frame. */



const grbmap	=Gr.Bin.bmap

const TrBase	=newShTrM( Map )


const bmap	=
{
	size	:
	{
		bits	:grbmap.ty.soil.plfl.veg.age.bits
	},
	vegty	:
	{
		bits	:grbmap.ty.soil.plfl.veg.ty.bits
		,
		valsa	:grbmap.ty.soil.plfl.veg.ty.valsa
	}
}


export default class Canopy	extends TrBase
{
	/** Additional binary map for faster client drawing. */
	bin2

	can	=new OffscreenCanvas( 0 ,0)
	
	ctx	=this.can.getContext( '2d')

	static Bincl	=newBinM( 0 ,bmap ,calc_bmap_typarrs( bmap))

	// static maxbrlvl	=Gr.maxsoilvegage()



	setvegty( loc ,ty)
	{
		this.bin2.setval_str( this.ic( loc) ,bmap.vegty ,ty)
	}

	getvegty( loc)
	{
		return this.getvegty_i( this.ic( loc))
	}

	getvegty_i( ic)
	{
		return this.bin2.getval_str( ic ,bmap.vegty)
	}



	///////////////////////////////////////////////////////////////////////////


	/** Set the proper binary data plus create bin2 helper buffer and
	 * update it. */

	setbin( bin )
	{
		const map	=this

		super.setbin( bin)

		this.bin2	=new Canopy.Bincl( this._r ,bin.cellsl ,this.getloc())

		const v	=new V()

		map.fore(( loc)=>
		{
			// this.updatefloorty( loc, v )

			const type	=this.getfloorty( loc)
			
			switch( type )
			{
				case "branch" :

					this.eval_endbr_upd( loc ,v)
				break
			}
		})
		return map
	}


	///////////////////////////////////////////////////////////////////////////



	draw( can ,pl)
	{
		const map	=this

		let plh	=pl?.pos.h	|| 0

		const col	=new Col()

		can.forcell(( loc)=>
		{
			if( ! this.inside( loc))	return

			if( map.getleafl( loc))
			{
				map.drawleaves( can ,loc ,0 ,plh)
			}
		})
		can.ctx.shadowColor = 'transparent'

		can.forcell(( loc)=>
		{
			if( ! this.inside( loc))	return

			const ic	=map.ic( loc)

			// vsq.set(loc).tosqc( can )

			switch( map.getfloorty_i( ic))
			{
				case "trunk" :

					can.maps.gr.drawstem( can ,loc ,null ,ic ,col)
				break;
				case "branch" :

					map.drawbranch( can ,loc ,plh ,ic ,col)
				break;
			}
		})
		if( plh === 1 )
		{
			can.drawclpl()
		}
		can.forcell(( loc )=>
		{
			if( ! this.inside(loc) )	return

			if( map.getleafh( loc ))
			{
				map.drawleaves( can, loc, 1, plh )
			}
		})
		can.ctx.globalAlpha	=1

		can.ctx.shadowColor ='transparent'

		// can.ctx.drawImage( map.can.transferToImageBitmap(), can._crn.x,can._crn.y)
	}


	///////////////////////////////////////////////////////////////////////////


	setbranch( loc ,dir)
	{
		super.setbranch( loc, dir )

		this.updatefloorty( loc ,new V(), "branch" )
	}

	/** @todo check if loc is inside */

	setfloorty( loc, type )
	{
		super.setfloorty( loc, type )

		this.updatefloorty( loc ,new V(), type )
	}


	///////////////////////////////////////////////////////////////////////////////



	updatefloorty( loc, vbuf, type )
	{
		type	??=this.getfloorty( loc )
			
		switch( type )
		{
			case "branch" :

				this.eval_endbr_upd( loc, vbuf )

			case "trunk" :

				// this.paintleaves( loc, vbuf )
		}
	}


	///////////////////////////////////////////////////////////////////////////



	setbrsize( loc, size )
	{
		this.setbrsize_i( this.ic(loc), size )
	}

	setbrsize_i( ic, size )
	{
		this.bin2.setval( ic, bmap.size, size )
	}




	getbrsize( loc)
	{
		return this.getbrsize_i(this.ic(loc))
	}
	getbrsize_i( ic)
	{
		return this.bin2.getval( ic ,bmap.size)
	}


	/** Calculate branch sizes and types at the newly revealed branches */

	shift( dir ,...args)
	{
		super.shift( dir ,...args)

		const map	=this

		const v	=new V()

		map.fordiredge(( loc)=>
		{
			const ic	=map.ic( loc)
			
			switch( map.getfloorty_i( ic))
			{
				case "none":

				break
				case "trunk":

				break
				case "branch":

					if( map.eval_endbr_upd( loc ,v) ===1)
					{
						map.calcbrsizes( v.set( loc))
					}
				break		
			}
		}
		, dir )
	}



	///////////////////////////////////////////////////////////////////////////


	/** Check if it's the end of a branch. If yes, do all of the calculations
	 * and data storing.
	 * Specifically set branch sizes and set vegty for the entire branch.
	 * @arg {Vec}	v -scratch Vec
	 * @return {number}	-0 if end of branch,
	 * 	1 if not end and is not set, 2 is not end and is already set. */

	eval_endbr_upd( loc ,v)
	{
		const map	=this

		if( map.getbrsize( loc))	return 2

		for(var dir=0; dir<6; dir++ )
		{
			if( map.br_doescont( v.set( loc) ,dir))
			{
				return 1
			}
		}
		v.set( loc)

		var size	=1

		const brs	=[]

		var treety

		while( true)
		{
			map.setbrsize( v ,size)

			brs.push( v.clone())

			map.br_goback( v)

			const ic	=map.ic( v)

			if( ! map.inside( v)) break

			const floorty	=map.getfloorty_i( ic)
			
			if( floorty !=="branch")
			{
				if( floorty ==="trunk")	treety	=map.gr.getsoilvegty( v)

				break
			}
			else if( ! treety)
			{
				const vegty	=map.getvegty_i( ic)

				if( vegty !=="none")	treety	=vegty
			}
			size ++

			if( map.getbrsize_i( ic) >=size)	break
		}
		if( treety)
		{
			for(const locbr of brs)
			{
				map.setvegty( locbr ,treety)
			}
		}
		return 0
	}



	/** Is used by map.shift()
	 * Loc is NOT changed */

	calcbrsizes( loc)
	{
		const map	=this

		const loc2	=loc.c()

		var size	=1

		for(var dir =0;dir< 6 ;dir++)
		{
			loc2.s( loc).neighh( dir)

			if( ! map.inside( loc2))	continue

			const ic	=map.ic( loc)

			if( map.isnextbr_i( ic ,dir))
			{
				const size2	=map.getbrsize_i( ic) || map.calcbrsizes( loc2)

				if( size2 >=size)
				{
					size	=size2 +1
				}
			}
		}
		map.setbrsize( loc ,size)

		return size
	}


	///////////////////////////////////////////////////////////////////////////


	/**@arg {string} [ty]	-Type of plant */

	drawbranch( can ,loc ,plh ,ic ,colbuf ,ty)
	{
		const map	=this

		ic	??=map.ic( loc)

		ty	??=map.getvegty_i( ic)

		var odir	=map.getbrdir_i( ic )

		var{ v, v2, ctx }	=can

		// var ctx	=map.ctx

		ctx.globalAlpha	=plh === map.getloc().h	? 1	: 0.3

		var lvl	=map.getbrsize_i(ic)

		const maxlvl	=maxbrlvl( ty)

		// if(lvl===1)	debugger

		var dir	=V.rotopph(odir)

		var r	=V.sin60*0.3333	//units.r*3=>units.h

		ctx.beginPath()

		var path	=new Path2D()

		if( lvl === 1 )
		{
			v.set( V.dirvh[odir] ).mul(0.5).addv( loc )
		}
		else
		{
			v.set(loc)
		}

		v.addv(
			
			v2.set( V.dirvhrot(dir,1) ).addv( V.dirvhrot(dir,2) ).mul( w(lvl-1)*r )
		
		).tosqc( can )

		var ox	=v.x,	oy	=v.y

		path.moveTo( v.x, v.y )

		if( lvl === 1 )
		{
			v.set( V.dirvh[odir] ).mul(0.5).addv( loc )
		}
		else
		{
			v.set(loc)
		}

		v.addv(
			
			v2.set( V.dirvhrot(dir,-1) ).addv( V.dirvhrot(dir,-2) ).mul( w(lvl-1)*r )
		
		).tosqc( can )

		path.lineTo( v.x, v.y )

		ctx.moveTo( v.x, v.y )

		v.set( loc ).neighh(dir).addv(
			
			v2.set( V.dirvhrot(dir,-1) ).addv( V.dirvhrot(dir,-2) ).mul( w(lvl)*r )
		
		).tosqc( can )

		path.lineTo( v.x, v.y )

		ctx.lineTo( v.x, v.y )

		v.set( loc ).neighh(dir).addv(
			
			v2.set( V.dirvhrot(dir,1) ).addv( V.dirvhrot(dir,2) ).mul( w(lvl)*r )
		
		).tosqc( can )

		path.lineTo( v.x, v.y )

		path.closePath()

		var col	=colbuf

		Gr.treecol( lvl * 3 + 3 , col )
		ctx.fillStyle	=col.str()
		ctx.fill(path)

		ctx.moveTo( v.x, v.y )
		ctx.lineTo( ox, oy )

		ctx.lineWidth	=1
		ctx.strokeStyle	="#000"

		ctx.stroke()



		function w( lvl)
		{
			const brminw	=0.2	//out of units.h

			return	lvl<1 ? 0	: Canopy.calcy( 1 ,brminw ,maxlvl ,0.5 ,lvl)

				//h*(4*lvl+max-5)/(5*max-5)
		}
	}


	/** @arg trans	-if true is def transparent, plh not needed? */

	drawleaves( can, loc, trans, plh )
	{
		var map	=this

		var{ v, ctx, units }	=can

		var{ r, h2 }	=units

		v.set(loc).tosqc(can).sub(r, h2>>1)

		// ctx.globalAlpha	=1
		ctx.globalAlpha	=! trans && plh === map.getloc().h	? 1	: 0.18

		// ctx.globalCompositeOperation	="multiply"

		ctx.drawImage( can.imgs().o.leaves5_sh, v.x-1,v.y, r<<1, h2 )

		// ctx.globalAlpha	=! trans && plh === map.getloc().h	? 1	: 0.18

		// ctx.shadowColor = "black";
		// ctx.shadowOffsetX = 0;
		// ctx.shadowOffsetY = 1;

		// ctx.globalCompositeOperation	="source-over"

		ctx.drawImage( can.imgs().o.leaves5, v.x,v.y, r<<1, h2 )

		// debugger
	}
}