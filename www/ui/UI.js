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
        if( this.page )
        {   
            if( pagen === "clplinv" )
            {
                this.page.hide()
            }
            else    this.html.deldiv( pagen )
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

            default :

            break
        }
        if( div )
        {
            div.show()
        }
        this.page   =div

        return div
    }


    async newclplinv( pl )
    {
		return await this.html.loaddivgo( "plinv" ,pl ,[] ,"clplinv" ,true )
    }


    clear()
    {   
        const html  =this.html

        html.deldiv( 'login' )
        html.deldiv( 'createpl' )

        html.ks.plinv?.hide()
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