import V	from '../shared/Vec.js'


/***********************************
 * THIS DOESN'T WORK ATM
 * BECAUSE BROWSERS DON'T ALLOW BOTH SCROLLING
 * AND DRAGGING
 * I want to start dragging of user holds the touch for a time
 * Not possible right now
 */

export default class Drag
{
	div

	bound

	down	=false

	startt	=new V()

	// last	=new V()

	pos	=new V()

	pointid

	time	=0

	ondown	=this.#ondown. bind(this)

	// readppos	=this.#readppos. bind(this)

	onup	=this.#onup. bind(this)

	ondrag	=this.#ondrag. bind(this)

	ondragup	=this.#ondragup. bind(this)

	onmove	=this.#onmove. bind(this)

	ondragout

	onframe

	static delay	=500



	constructor(div ,bound =document )
	{
		this.div	=div

		this.bound	=bound

		this.ondragout	=this.#ondragout.bind(this)

		this.onframe	=this.#onframe.bind(this)
	}



	///////////////////////////////////////////////////////////////////////////


	start( isframe =true )
	{
		this.div.el.addEventListener( "pointerdown" ,this.ondown )
	}

	stop()
	{
		this.div.el.removeEventListener( "pointerdown" ,this.ondown )
	}


	///////////////////////////////////////////////////////////////////////////



	#ondown( ev )
	{
		// ev.stopPropagation()

		const drag	=this

		drag.down	=true

		drag.pos.setev( ev )

		drag.pointid	=ev.pointerId

		const{ onup }	=drag

		const{ el }	=drag.div

		window.addEventListener('pointerup' ,onup )
		window.addEventListener('pointercancel' ,onup )
		window.addEventListener('blur' ,onup )
		window.addEventListener('contextmenu' ,onup )
		el.addEventListener( "pointerout" ,onup )
		el.addEventListener("pointermove", drag.onmov )

		setTimeout( drag.ondrag, Drag.delay )
	}



	#readppos( ev )
	{
		this.pos.setev( ev )
	}



	#onup( ev )
	{
		const drag	=this

		drag.down	=false

		// console.log( "up" )

		const{ onup }	=drag

		const{ el }	=drag.div

		window.removeEventListener('pointerup' ,onup )
		window.removeEventListener('pointercancel' ,onup )
		window.removeEventListener('blur' ,onup )
		window.removeEventListener('contextmenu' ,onup )
		el.removeEventListener( "pointerout" ,onup )
		el.removeEventListener("pointermove", drag.onmove )
	}



	#ondrag()
	{
		const drag	=this

		// console.log( tch.down )

		if( ! drag.down )	return

		const{ pos }	=drag

		drag.startt.set( pos )

		const{ el }	=drag.div

		el.setPointerCapture( drag.pointid )

		// el.style.pointerEvents	="none"

		// 1. Capture the EXACT current size and screen position
		const rect = el.getBoundingClientRect();

		// 2. Set the dimensions explicitly so it doesn't collapse
		el.style.width = `${rect.width}px`;
		el.style.height = `${rect.height}px`;

		el.style.position	="fixed"

		el.style.left	=`${pos.x + 1}px`
		el.style.top	=`${pos.y + 1}px`

		const bound	=this.bound

		// document.body.classList.add( "dragging" )

		el.classList.add("drag")

		const ondout	=drag.ondragout

		el.addEventListener("pointerup", drag.ondragup )
		bound.addEventListener("pointercancel", ondout )
		bound.addEventListener("mouseleave" ,ondout )
		window.addEventListener('blur' ,ondout )
		window.addEventListener('contextmenu' ,ondout )
		// el.addEventListener("pointermove", drag.onmove )

		// tch.time	=performance.now()

		requestAnimationFrame( this.onframe )
	}



	#ondragup( ev )
	{
		const drag	=this

		// var el	=tch.ui.el

		const tgt	=document.elementFromPoint(ev.clientX, ev.clientY)

		console.log(tgt)

		// 4. Act on the target
		/*if (dropTarget && dropTarget.closest('.inventory-slot')) {
			moveItemToSlot(el, dropTarget.closest('.inventory-slot'));
		}*/

		// drag.div.dragto?.( trgt )

		this.stopdrag( ev )
	}



	#onmove( ev )
	{
		var tch	=this

		tch.pos.setev( ev )

		return tch.stopdefs(ev)
	}



	#ondragout( ev )
	{
		var tch	=this

		tch.stopdrag( ev )
	}


	#onframe( t )
	{
		var tch	=this

		// tch.last.set(tch.pos)

		if( tch.down )
		{
			tch.div.el.style.transform	=`translate(${tch.pos.x-tch.startt.x}px, ${tch.pos.y-tch.startt.y}px)`

			requestAnimationFrame( this.onframe )
		}
	}


	///////////////////////////////////////////////////////////////////////////



	stopdefs( ev )
	{
		// ev?.stopPropagation();
		ev?.preventDefault()
		// ev.cancelBubble=true;
		ev.returnValue	=false
		return false
	}


	stopdrag( ev )
	{
		const tch	=this

		tch.down	=false

		// document.body.classList.remove( "dragging" )

		el.classList.remove("drag")

		const el	=tch.div.el

		el.style.transform	=""
		el.style.width	=""
		el.style.height	=""
		el.style.position	=""
		el.style.left	=""
		el.style.top	=""
		// el.style.pointerEvents	=""

		el.releasePointerCapture( tch.pointid )

		const bound	=tch.bound

		el.removeEventListener("pointerup", tch.ondragup )
		bound.removeEventListener("pointercancel", tch.ondragout )
		bound.removeEventListener("mouseleave" ,tch.ondragout )
		window.removeEventListener('blur' ,tch.ondragout )
		window.removeEventListener('contextmenu' ,tch.ondragout )
		el.removeEventListener("pointermove", tch.onmove )
	}
}