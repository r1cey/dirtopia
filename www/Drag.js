import V	from './game/shared/Vec.js'

export default class Touch
{
	ui

	bound

	down	=false

	startt	=new V()

	// last	=new V()

	pos	=new V()

	time	=0

	ondown

	onup

	ondrag

	ondragup

	onmove

	ondragout

	onframe

	static delay	=500



	constructor(ui ,bound =document )
	{
		this.ui	=ui

		this.bound	=bound

		this.ondown	=this.#ondown.bind(this)

		this.onup	=this.#onup.bind(this)

		// this.ondrag	=this.#ondrag.bind(this)

		this.ondragup	=this.#ondragup.bind(this)

		this.onmove	=this.#onmove.bind(this)

		this.ondragout	=this.#ondragout.bind(this)

		this.onframe	=this.#onframe.bind(this)
	}



	///////////////////////////////////////////////////////////////////////////


	start( isframe =true )
	{
		this.ui.el.addEventListener( "pointerdown" ,this.ondown )
	}

	stop()
	{
		this.ui.el.removeEventListener( "pointerdown" ,this.ondown )
	}


	///////////////////////////////////////////////////////////////////////////



	#ondown( ev )
	{
		ev.stopPropagation()

		const tch	=this

		tch.down	=true

		window.addEventListener('pointerup' ,tch.onup )
		window.addEventListener('pointercancel' ,tch.onup )
		window.addEventListener('blur' ,tch.onup )
		window.addEventListener('contextmenu' ,tch.onup )
		tch.ui.el.addEventListener( "pointerout" ,tch.onup )

		setTimeout( tch.#ondrag.bind( tch, ev ), Touch.delay )
	}

	#onup( ev )
	{
		var tch	=this

		tch.down	=false

		// console.log( "up" )

		window.removeEventListener('pointerup' ,tch.onup )
		window.removeEventListener('pointercancel' ,tch.onup )
		window.removeEventListener('blur' ,tch.onup )
		window.removeEventListener('contextmenu' ,tch.onup )
		tch.ui.el.removeEventListener( "pointerout" ,tch.onup )
	}


	#ondrag( ev )
	{
		const tch	=this

		// console.log( tch.down )

		if( ! tch.down )	return

		tch.startt.setev( ev )
		// tch.last.setev( ev )
		tch.pos.setev( ev )

		const el	=tch.ui.el

		el.setPointerCapture( ev.pointerId )

		// el.style.pointerEvents	="none"

		// 1. Capture the EXACT current size and screen position
		const rect = el.getBoundingClientRect();

		// 2. Set the dimensions explicitly so it doesn't collapse
		el.style.width = `${rect.width}px`;
		el.style.height = `${rect.height}px`;

		el.style.position	="fixed"

		el.style.left	=`${ev.clientX+1}px`
		el.style.top	=`${ev.clientY+1}px`

		const bound	=this.bound

		document.body.classList.add( "dragging" )

		el.addEventListener("pointerup", tch.ondragup )
		bound.addEventListener("pointercancel", tch.ondragout )
		bound.addEventListener("mouseleave" ,tch.ondragout )
		window.addEventListener('blur' ,tch.ondragout )
		window.addEventListener('contextmenu' ,tch.ondragout )
		el.addEventListener("pointermove", tch.onmove )

		// tch.time	=performance.now()

		requestAnimationFrame( this.onframe )
	}

	#ondragup( ev )
	{
		const tch	=this

		// var el	=tch.ui.el

		const trgt	=document.elementFromPoint(ev.clientX, ev.clientY)

		// 4. Act on the target
		/*if (dropTarget && dropTarget.closest('.inventory-slot')) {
			moveItemToSlot(el, dropTarget.closest('.inventory-slot'));
		}*/

		tch.ui.dragto?.( trgt )

		this.stopdrag( ev )

		/*if(performance.now() - tch.time <= 200)
		{
			tch.uie.clicked?.( tch.pos )
		}*/

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
			tch.ui.el.style.transform	=`translate(${tch.pos.x-tch.startt.x}px, ${tch.pos.y-tch.startt.y}px)`

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
		var tch	=this

		tch.down	=false

		document.body.classList.remove( "dragging" )

		const el	=tch.ui.el

		el.style.transform	=""
		el.style.width	=""
		el.style.height	=""
		el.style.position	=""
		el.style.left	=""
		el.style.top	=""
		// el.style.pointerEvents	=""

		el.releasePointerCapture( ev.pointerId )

		var bound	=tch.bound

		el.removeEventListener("pointerup", tch.ondragup )
		bound.removeEventListener("pointercancel", tch.ondragout )
		bound.removeEventListener("mouseleave" ,tch.ondragout )
		window.removeEventListener('blur' ,tch.ondragout )
		window.removeEventListener('contextmenu' ,tch.ondragout )
		el.removeEventListener("pointermove", tch.onmove )
	}
}