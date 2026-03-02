import UiEl from "./UIElement.js"
import V	from "./game/shared/Vec.js"


export default class CtxM	extends UiEl
{
	pos	=new V()

	opts	=[]



	del()
	{
		document.body.removeChild( this.el )

		this.html.el.removeEventListener( "click", this.delbound )

		this.opts.length	=0

		this.el.textContent = '';
	}
	delbound	=this.del.bind(this)



	constructor( gobj ,pointev )
	{
		super( "ACTIONS" ,gobj )

		this.pos.setev(pointev)

		if( gobj.isitem )
		{
			this.addopt( "move" ,()=>
				{	
					gobj.ui.inv.movmod()
				}
			)
		}
		this.setelpos()
	}


	
	///////////////////////////////////////////////////////////////////////////


	setelpos()
	{
		var style	=this.el.style

		var pos	=this.pos

		style.left	=`${Math.floor(pos.x)}px`
		style.top	=`${Math.floor(pos.y)}px`
	}
}


///////////////////////////////////////////////////////////////////////////////



CtxM.prototype. newev	=function( ev )
{
	return this.new( this.pos.setev( ev ) )
}



CtxM.prototype. new	=function( pos )
{
	this.pos.set( pos )

	return this
}



CtxM.prototype. addopt	=function( str, act )
{
	var opt	=new Opt( this.gobj ,str ,act )
	
	this.opts.push( opt )

	this.el.appendChild( opt.el )

	return this
}



CtxM.prototype. show	=function()
{
	if( ! this.opts.length )	return

	// _pos.set(this.pos).tosqc( can )

	this.setelpos()

	document.body.appendChild( this.el )

	setTimeout(()=>{ this.html.el.addEventListener( "click", this.delbound )})

	// this.int	=window.setInterval( this.check.bind(this), 821 )	//73bpm
}


///////////////////////////////////////////////////////////////////////////////



CtxM.prototype. setelpos	=function()
{
	var style	=this.el.style

	var pos	=this.pos

	style.left	=`${Math.floor(pos.x)}px`
	style.top	=`${Math.floor(pos.y)}px`
}


///////////////////////////////////////////////////////////////////////////////



class Opt	extends UiEl
{
	check



	constructor( gobj ,str ,act ,check )
	{
		super( "button" ,gobj )

		var el	=this.el

		el.textContent	=str
	
		el.onclick	=act

		this.check	=check
	}
}