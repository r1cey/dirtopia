import DivGo from '../DivGameObj.js'
import V	from '../../shared/Vec.js'
import Loc	from '../../shared/Loc.js'
import Col	from '../../shared/Color.js'
import Cell	from "../../maps/Cell.js"
// import Mov from './Mov.js'
import Touch	from './Touch.js'
import CtxM	from './ContextMenu.js'
 

const rad60	=Math.PI/3

/** Scratch vector */
const scrv	=new V()



/** Main UI class. Holds the main sizing units as well as
 * the main drawing canvas. */


export default class Canvas	extends DivGo
{
	imgs()	{return this.ui().imgs }

	cl()	{return this.ui().game }

	ui()	{return this.dad.ui }

	w2()	{return this.el.width >>1}
	h2()	{return this.el.height >>1}

	ctx

	ctxmenu

	units	=
	{
		/* Side of hexagon in pixels. Main settable unit. */
		r	:40
		,
		/** Distance from one center to the next */
		h2	:70	// calc cache
		,
		/** 1/h2 */
		dh2	:1/70	// calc cache
		,
		update( r)
		{
			this.r	=r
			this.h2	=r *V.sin60 *2
			this.dh2	=1 /this.h2
		}
		,
		/**@return {V}	-Distance vector from one cell to next */
		dsq()	{return this._dsq.setxy((this.r >>1) *3 ,this.h2)}
		,
		_dsq	:new V()
	}
	crn	=new V(0,0)	// top left corner in hex

	size2	=new V(0,0)	// vector from top left corner to center in hex

	_crn	=new V()	//just cache for corner in pixels

	pl

	time	=0

	animat	=false

	showslopes	=false

	touch	=new Touch(this)

	acts

	showlvls	=false

	// dragpos	=new V()

	/** Scratch vectors against garbage collection */
	v	=new V()
	v2	=new V()
	v3	=new V()

	frame


	///////////////////////////////////////////////////////////////////////////



	constructor( maps ,html ,el )
	{
		super( maps ,html ,el )

		this.ctx	=this.el.getContext('2d' ,{ alpha :false })

		this.units.update(40)

		this.resize()

		this.setpos(new V(0,0))

		// CtxM.can	=this

		this.drawgrid()
	}


	get maps()	{return this.gmaps() }


	gmaps()	{return this.gobj }

	/** @todo - look up all gmap() and see if it can be called without this.pl */

	gmap()	{return this.pl ? this.gmaps().loc2map(this.pl.loc) : null }


	///////////////////////////////////////////////////////////////////////////



	setpl( pl )
	{	
		const can	=this
		
		can.pl	=pl

		can.setpos(pl.pos)
	}



	runani()
	{
		const can	=this

		if( can.animat )	return

		this.time	=performance.now()

		can.animat	=true

		window.requestAnimationFrame( this.frame )
	}

	endani()
	{
		this.animat	=false
	}



	#frame( now )
	{
		const can	=this

		const dt	=now - this.time

		const{ pl ,touch :tch }	=can

		this.time	=now

		this.draw( dt )

		this.ui().fps.set(Math.floor(1000/dt))
		
		if(tch.on)
		{
			const deltasq	=scrv.set(tch.pos).subv(tch.last )

			if( ! deltasq.zero() )	pl.movdest( deltasq.tohexc(can) )

			/*if( ! pl.isforcemov )
			{
				const deltasq	=scrv.set(tch.pos).subv(tch.start)

				const dest	=can.v2.set(deltasq).tohexc(can).addv(pl.loc)

				const destloc	=can.v3.set(dest).roundh()
				
				if( ! destloc.eq( pl.dest ))
				{
					pl.vismov( destloc )
				}
				// else	console.log( "stop" )
			}*/
			tch.onframe()
		}
		pl.step()

		can.setpos(pl.pos)

		if( can.animat )
		{
			window.requestAnimationFrame( this.frame )
		}
	}

	frame	=this.#frame.bind(this)



	isclpl( possqel )
	{
		const can	=this

		const size2	=new V( can.w2() ,can.h2() )

		const r	=this.pl.r * can.units.r

		return size2.dist2( possqel ) < r**2
	}


	calcsqcrn()
	{
		return this._crn.s(this.crn).tosqc(this)
	}
}



///////////////////////////////////////////////////////////////////////////////



Canvas.prototype. runtouch	=function()
{
	const can	=this

	/*ui.menu.setopts(
	[
		{
			name	:'zoomin'
			,
			symb	:'+'
			,
			fun	:()=>{ can.zoom(2) }
		}
		,
		{
			name	:'zoomout'
			,
			symb	:'-'
			,
			fun	:()=>{ can.zoom(0.5) }
		}
	])

	ui.menu.show()*/

	if( can.pl && can.maps )
	{
		this.el.addEventListener( 'pointerdown', this.touch.ondown )
	}
}



Canvas.prototype. zoom	=function( x )
{
	this.units.update( this.units.r * x )

	var cntr	=this.gpos()

	this.size2.div( x )

	this.setpos(cntr)
}


///////////////////////////////////////////////////////////////////////////////



Canvas.prototype. clear	=function()
{
	const crn	=this.calcsqcrn()

	this.ctx.clearRect( crn.x, crn.y,
			this.el.width, this.el.height )
}




Canvas.prototype. setpos	=function( pos )
{
	this.crn.set( pos ).subv( this.size2 )

	this.trnsfrm()
}


Canvas.prototype. gpos	=function()
{
	return this.crn.c().addv( this.size2 )
}




Canvas.prototype. draw	=function( dt )
{
	const can	=this

	const{ pl }	=can

	const maps	=can.gmaps()

	// var{ r, h }	=can.units

	can.clear()

	// can.drawgrid()

	if( maps.isready() )
	{
		maps.gr.draw( can )

		if( pl.loc.h === 0 )	can.drawclpl()
		
		maps.tr.draw( can ,pl )
	}
	if( pl.hands.item )
	{
		const{ ctx }	=can

		const imgs	=can.imgs()

		const maxsize	=90

		const crn	=can.calcsqcrn().addxy( can.el.width - maxsize - 20 , 20 )

		ctx.strokeStyle	='#ff0000'
		ctx.lineWidth	=1
		ctx.beginPath()
		ctx.rect( crn.x + 0.5, crn.y + 0.5, maxsize, maxsize )
		ctx.closePath()
		ctx.stroke()

		let img	=imgs.o.hands

		const size	=scrv.setxy( img.width ,img.height )

		let ratio	=maxsize / Math.max( size.x ,size.y )

		size.mul( ratio ).round()

		ctx.drawImage( img, crn.x ,crn.y ,size.x ,size.y )

		img	=imgs.o[pl.hands.item.gkey()]

		if( img )
		{
			size.setxy( img.width ,img.height )

			size.mul(( maxsize -10 )/ Math.max( size.x ,size.y )).round()

			ctx.drawImage( img
				,
				crn.x +(( maxsize - size.x )>>1)
				,
				crn.y +(( maxsize - size.y )>>1)
				,
				size.x - 10 ,size.y - 10
			)
		}
	}
	{
		const vispls	=this.cl().vispls
		
		let plvis

		for(let name in vispls  )
		{
			plvis	=vispls[name]

			plvis.step( dt )

			can.drawpl( plvis )
		}
	}
	if( can.pl )
	{
		this.drawbargui( 0, this.pl.water, '#2211ff' )

		this.drawbargui( 1, this.pl.heat, '#fc2200' )
	}
}


///////////////////////////////////////////////////////////////////////////////


/**  */

Canvas.prototype. clicked	=function( possqel )
{
	const can	=this

	const ctxm	=new CtxM( can ,possqel )

	if( ! ctxm.opts.length )	return
	
	const ui	=this.ui()

	ui.setctxm( ctxm )
}



Canvas.prototype. trnsfrm	=function()
{
	const crn	=this.calcsqcrn()

	// crn.set( this.crn ).tosqc( this)

	this.ctx.setTransform(1,0,0,1,
		-crn.x, -crn.y)

	var maps	=this.maps

	if(maps)
	{
		maps.tr.ctx.setTransform(1,0,0,1,
			-crn.x, -crn.y)
	}
}


///////////////////////////////////////////////////////////////////////////////



Canvas.prototype. drawgrid	=function()
{
	var { ctx, units:u }	=this

	var v	=new V()

	var hr	=u.r>>1,	h	=u.h2>>1

	this.forcell( (function(vh)
	{
		v	=vh.c().tosqc(this)

		ctx.lineWidth	=1
		ctx.strokeStyle	='grey'
		this.drawl( v.x-u.r, v.y, v.x-hr, v.y-h )
		this.drawl( v.x-hr, v.y-h, v.x+hr, v.y-h )
		this.drawl( v.x+hr, v.y-h, v.x+u.r, v.y )

	}).bind(this))
/*
	var u	=this.units

	var crncell	=this.getcrncell().tosqc(this)

	var rd2	=this.units.r >> 1

	var h	=this.units.h2 >> 1

	for(var x =crncell.x ; x < crncell.x+this.el.width ; x +=this.units.r*3 )
	{
		for(var y=crncell.y ; y < crncell.y+this.el.height+u.h2 ; y += this.units.h2 )
		{
			ctx.lineWidth	=1
			ctx.strokeStyle	='grey'
			this.drawl( x-rd2, y-h, x+rd2, y-h)			
			// console.log( x, y )
			this.drawl( x+rd2, y-h, x+u.r, y )
			this.drawl( x+u.r, y, x+rd2, y+h )
			ctx.strokeStyle	='#6666FF'
			this.drawl( x+u.r, y, x+(u.r<<1), y )
			this.drawl( x+(u.r<<1), y, x+(u.r<<1)+rd2, y-h )
			this.drawl( x+(u.r<<1), y, x+(u.r<<1)+rd2, y+h )
		}
	}*/
}




Canvas.prototype. drawclpl	=function()
{
	var can	=this

	var ctx	=can.ctx

	// let r	=can.units.r
	
	var pl	=this.pl
	
	var	pos	=pl.pos.c().tosqc(can)

	ctx.fillStyle	=pl.col.str()
	ctx.beginPath()
	ctx.arc( pos.x, pos.y, pl.r*can.units.r, 0, 2*Math.PI)
	ctx.globalAlpha	=1
	ctx.fill()

	if( can.maps?.gr )// drawreach
	{
		can.maps.gr.forring(( loc )=>
		{
			pos.set(loc).tosqc(can)

			ctx.globalAlpha	=0.1

			can.fillhex( pos, "#F6F0FF" )

			ctx.globalAlpha	=1
		}
		, 1, pl.loc )
	}
}




Canvas.prototype. drawpl	=function( pl )
{
	var can	=this

	var	pos	=pl.pos.c().tosqc(can)

	var ctx	=can.ctx

	ctx.fillStyle	=pl.col.str()
	ctx.beginPath()
	ctx.arc( pos.x, pos.y, pl.r*r, 0, 2*Math.PI)
	ctx.fill()

	if(pl.cl)
	{
		ctx.strokeStyle	=pl.col.c().inv().str()
		ctx.lineWidth	=3
		ctx.beginPath()
		ctx.arc( pos.x, pos.y, pl.r*r, 0, 2*Math.PI)
		ctx.stroke()
	}
}


///////////////////////////////////////////////////////////////////////////////



Canvas.prototype. drawbargui	=function( i, val,  col )
{
	const can	=this

	const{ ctx }	=can
	
	const margin	=10

	const size	=scrv.setxy(20, 100)
	
	const c	=can.calcsqcrn().round().addxy( margin*(i+1) + size.x*i, margin )

	ctx.fillStyle	=col
	
	ctx.beginPath()
	ctx.rect( c.x, c.y + Math.round( size.y *( 1 - val )),
	
		size.x, Math.round( size.y * val ))

	ctx.closePath()
	
	ctx.fill()
	
	ctx.strokeStyle	='#aa9988'
	ctx.lineWidth	=1

	ctx.beginPath()
	ctx.rect( c.x + 0.5, c.y + 0.5, size.x, size.y )
	ctx.closePath()

	ctx.stroke()
}



Canvas.prototype. resize	=function()
{
	const newsizesq	=new V( document.documentElement.clientWidth ,
						document.documentElement.clientHeight )

	const newsize2h	=newsizesq.c().half().tohexc(this)

	this.crn.addv( this.size2 ).subv( newsize2h )

	this.size2.set( newsize2h )

	const el	=this.el

	el.width	=newsizesq.x

	el.height	=newsizesq.y

	const maps	=this.maps

	if( maps )
	{
		maps.tr.can.width	=el.width
		maps.tr.can.height	=el.height
	}
	this.trnsfrm()
}



/** fun( loc, can ) 
 * Don't change loc in fun! */

Canvas.prototype. forcell	=function( fun )
{
	/*
	var crn	=this.crn.c().roundh().add(-1,0)

	var vh	=new V().set(crn)

	var vsq	=vh.c().tosqc(this)

	// this.drawdbug( crn.c().add(2,0).tosqc(this) )

	var dsq	=this.units.dsq()

	var el	=this.el

	var vsqmax	=dsq.c().mul(3).addv(vsq).add( el.width, el.height )

	var crnsqx	=vsq.x

	for(var i=0 ; vsq.y<vsqmax.y ; i++, vsq.y+=dsq.y )
	{
		vh.y	=crn.y+i

		vh.x	=crn.x

		vsq.x	=crnsqx

		for( var j=0 ; vsq.x<vsqmax.x ; j++, vsq.x+=dsq.x )
		{
			fun(vh, this)		/// { }

			vh.x++

			vh.y	-=Number( !(j&1) )
			/*
			if( !(j&1) )	// Can be branchless optimised
			{
				vh.y--
			}*
		}
	}*/

	var crn	=this.crn.c().add(-1,0).roundh()

	var maxcrn	=this.size2.c().mul(2).add(2,1).todoffs()

	var v	=new V()

	for(var x =0;x<= maxcrn.x ;x++)
	{
		for(var y =0;y<= maxcrn.y ;y++)
		{
			fun( v.setxy(x,y).toaxial().addv(crn), this )
		}
	}
}


/** v is changed */

Canvas.prototype. isvis	=function( v )
{
	// var crn	=this.crn.c().add(-1,0)

	v.subv( this.crn ).add(1,0).todoffs()

	var maxcrn	=this.size2.c().mul(2).add(1,0).todoffs()

	return v.x >= 0 && v.x <= maxcrn.x && v.y>=0 && v.y<=maxcrn.y
}


///////////////////////////////////////////////////////////////////////////////



Canvas.prototype. drawopt	=function( i )
{
	var can	=this

	var{ ctx, ctxmenu: menu }	=can

	var pos	=can.tosq( menu.pos.c(). subv(can.posh) )

	ctx.fillText( menu.opts[i], pos.x, pos.y + i*menu.height )
}

Canvas.prototype. drawmenu	=function()
{
	var can	=this

	for(var i=0, len=can.ctxmenu.opts.length; i<len; i++ )
	{
		can.drawopt( i )
	}
}


///////////////////////////////////////////////////////////////////////////////



/** @arg {Vec} c	- in global pixels!*/

Canvas.prototype. fillhex	=function( c, col="#888888" )
{
	var ctx	=this.ctx
	var r	=this.units.r,	h	=this.units.h2>>1

	var f	=Math.floor
	var ce	=Math.ceil
	var d	=Math.round

	ctx.beginPath()
	ctx.moveTo(f( c.x-(r>>1) ),f( c.y-h-1 ))
	ctx.lineTo(ce( c.x+(r>>1) ),f( c.y-h-1 ))
	ctx.lineTo(ce( c.x+r ),d( c.y ))
	ctx.lineTo(ce( c.x+(r>>1) ),ce( c.y+h ))
	ctx.lineTo(f( c.x-(r>>1) ),ce( c.y+h ))
	ctx.lineTo(f( c.x-r ),d( c.y ))
	ctx.closePath()
	ctx.fillStyle	=col
	ctx.fill()
}



Canvas.prototype. drawimg	=function( loc, img, size =1, vbuf )
{
	var{ r, h2 }	=this.units

	vbuf.set(loc).tosqc(this).sub(r*size, (h2>>1)*size)

	this.ctx.drawImage( img, vbuf.x,vbuf.y, (r<<1)*size, h2*size )
}



/** @arg v	- in pixels */

Canvas.prototype. drawarrow	=function( v, w2, h, dir, col="#888888" )
{
	var angl	=rad60 + rad60*dir

	var ctx	=this.ctx

	var h2	=h >> 1

	var cosa	=Math.cos(angl)
	var sina	=Math.sin(angl)

	var r	=Math.round

	// I can optimise rotation

	ctx.beginPath()
	ctx.moveTo(r( v.x ),r( v.y ))
	ctx.lineTo(r( v.x + w2*cosa -(h-h2)*sina ),r( v.y - w2*sina - (h-h2)*cosa ))
	ctx.lineTo(r( v.x + w2*cosa - h*sina ),r( v.y - w2*sina - h*cosa ))
	ctx.lineTo(r( v.x - h2*sina ),r( v.y - h2*cosa ))
	ctx.lineTo(r( v.x - w2*cosa - h*sina ),r( v.y + w2*sina - h*cosa ))
	ctx.lineTo(r( v.x - w2*cosa -(h-h2)*sina ),r( v.y + w2*sina - (h-h2)*cosa ))
	ctx.closePath()
	ctx.fillStyle	=col
	ctx.fill()
}




Canvas.prototype. fillcirc	=function( x, y, r, col, colstrok )
{
	var ctx	=this.ctx

	ctx.beginPath()
	ctx.arc( Math.floor(x), Math.floor(y), Math.floor(r), 0, 2*Math.PI )
	ctx.fillStyle	=col
	ctx.fill()
	if( colstrok )
	{
		ctx.strokeStyle	=colstrok
		ctx.lineWidth	=1
		ctx.stroke()
	}
}




Canvas.prototype. drawl	=function( x1, y1, x2, y2 )
{
	var ctx	=this.ctx

	ctx.beginPath()

	ctx.moveTo(x1, y1)
	ctx.lineTo(x2, y2)

	ctx.stroke()
}



Canvas.prototype. drawdbug	=function(x, y)
{
	var { ctx }	=this

	ctx.beginPath()
	ctx.strokeStyle	='#aa9988'
	ctx.lineWidth	=2
	ctx.arc( x, y, 10, 0, 6 )
	ctx.stroke()
}


///////////////////////////////////////////////////////////////////////////////


/** Canvas related pixels to map location. */

Canvas.prototype. cansq2loc	=function( vcansq )
{
	const loc	=new Loc().set( vcansq )

	loc.tohexc( this ).addv( this.crn ).roundh()

	loc.h	=this.pl.loc.h

	return loc
}