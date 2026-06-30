import Can from "./canvas/Canvas.js"

import Html from "./html/Html.js"



export default class Interface
{
    game

    can =this.adddiv( new Can( this ))

    html

    stream



    resize_	=
	{
		toid	:0
		,
		delay	:100
	}

    resize  =this.#resize. bind(this)


    divswithoutel   =new Set()



    constructor( game )
    {
        this.game	=game

        if( document.readyState === 'loading' )
		{
    		// If the browser is still parsing, wait for the event

    		document.addEventListener('DOMContentLoaded', this.readhtml. bind(this) )
		}
		else
		{
    		this.readhtml()
		}
    }



    adddiv( div )
    {
        if( ! this.html )   this.divswithoutel.add( div )

        else    this.html.divs.set( div.el ,div )

        return div
    }



    readhtml()
    {
        this.html	=new Html( this )

        window.onresize	=this.onresize. bind(this)

        for( const div of this.divswithoutel )
        {
            div.readel( this.html )
        }
        this.divswithoutel.clear()
    }



        
    onresize()
    {
        const res_	=this.resize_

        if( res_.toid )	clearTimeout( res_.toid )
        
        res_.toid	=setTimeout( this.resize, res_.delay )
    }


    #resize()
    {
        this.can.resize()
    }
}