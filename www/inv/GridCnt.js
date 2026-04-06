import GridHold from "./GridHolder.js"


export default class GridContainer extends GridHold
{
    constructor( holder ,dad ,griduis )
	{
		super( holder ,dad ,griduis )
		
		const cntsym	=document.createElement( "cntsym" )

		this.el.appendChild( cntsym )

		this.fill()
	}



    getsize( defa )
    {
        const ret   =super.getsize( defa )

        ret[0] += 1

        return ret
    }
}