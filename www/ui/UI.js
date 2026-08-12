// import Can from "./canvas/Canvas.js"

import Html from "./Html.js"

import Imgs	from "./Imgs.js"

import{ isarreq }	from "../shared/utils.js"



export const imgdir	="ui/imgs/"



export default class Interface
{
    game

    get cl()    {return this.game }

    html

    con

    can

    page

	imgs	=new Imgs(this)

    ctxm

    fps

    stream

    itmoving



    resize_	=
	{
		toid	:0
		,
		delay	:100
	}


    // divswithoutel   =new Set()



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


    readhtml()
    {
        this.html	=new Html( this.game ,this )

        window.onresize	=this.onresize. bind(this)

        /*for( const div of this.divswithoutel )
        {
            div.readel( this.html )
        }
        this.divswithoutel.clear()*/
    }


    async setpage( pagen ,...args )
    {
        var div  =this.page

        if( div )
        {
            const name  =div.gname()

            if( name === "clplinv" )
            {
                div.hide()
            }
            else    this.html.deldiv( name )
        }
        div =null

        this.page   =div

        switch( pagen )
        {
            case "login" :

            case "createpl" :

                div =await this.html.loaddiv( pagen ,args ,pagen ,true )
            break
            case "clplinv" :

                div =this.html.ks[pagen]
            break
            default :

                this.can.runtouch()
            break
        }
        if( div )
        {
            div.show()
        }
        this.page   =div

        return div
    }

    spage   =this.setpage


    async newclplinv( pl )
    {
		return await this.html.loaddivgo( "plinv" ,pl ,[] ,"clplinv" ,true )
    }



    setctxm( ctxm )
    {
        this.ctxm   =ctxm

        const html  =this.html

        html.el.appendChild( ctxm.el )

        html.adddiv( ctxm )

        document.addEventListener( "pointerdown" ,ctxm.onoutclck )
    }


    delctxm()
    {
        const ctxm  =this.ctxm

        this.ctxm   =null

        ctxm.del()

        document.removeEventListener( "pointerdown" ,ctxm.onoutclck )
    }



    runitemmoving( div )
    {
        this.itmoving =div

        div.setmoving?.()

        const gobj  =div.getgo()

        const el    =document.createElement( "movover" )

        el.innerText    =gobj.gkey()+" is moving!"

        this.html.el.appendChild( el )
    }


    stopitemmoving()
    {
        const div	=this.itmoving

        if( ! div ) return

        this.itmoving   =null

        div.stopmoving?.()

        this.html.el.querySelector( "movover" ).remove()
    }


    itemmov( from ,to )
    {
		const page	=this.page

		if(( from.ispl() || to.ispl() )&& page?.gname() === "clplinv" )
		{
			const fromdiv	=page.go2div( from.at(-2) )

			if( fromdiv )	fromdiv.delitem( from.last() )

			const todiv	=page.go2div( to.last() )

			if( todiv )	todiv.additem( from.last() )
		}

        /*if( this.itmoving )
        {
            const{ divm }	=this

            const fromm	=divm.gnav()

			const itemm	=fromm.pop()

            if( isarreq( from ,fromm ))
			{
				this.stopitemmoving()
			}
		}*/
    }


        
    onresize()
    {
        const res_	=this.resize_

        if( res_.toid )	clearTimeout( res_.toid )
        
        res_.toid	=setTimeout( this.resize, res_.delay )
    }


    #resize()
    {
        this.html.resize()
    }
    resize  =this.#resize. bind(this)
}