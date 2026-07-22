// import Can from "./canvas/Canvas.js"

import Html from "./Html.js"

import Imgs	from "./Imgs.js"



export const imgdir	="ui/imgs/"



export default class Interface
{
    game

    html

    con

    can

    page

	imgs	=new Imgs(this)

    ctxm

    fps

    stream



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
        var page  =this.page

        if( page )
        {
            const name  =page.gname()

            if( name === "clplinv" )
            {
                page.hide()
            }
            else    this.html.deldiv( name )
        }
        var div =null

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

        const ondoctouch   =( ev )=>
        {
            console.log( "doc click!" )

            if( ! ctxm.el.contains( ev.target ) )
            {
                this.ctxm   =null

                this.html.deldiv( this.ctxm.elname() )

                document.removeEventListener( "pointerdown" ,ondoctouch )
            }
        }
        document.addEventListener( "pointerdown" ,ondoctouch )
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