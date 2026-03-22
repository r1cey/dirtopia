import Item from "./Item.js"
import newStack from "../shared/items/newStackable.js"



export default class Stack  extends newStack( Item )
{
    dragto( trgt ,nav )
	{
        var trgthold

		if( trgt.isholder )
		{
            trgthold    =trgt
		}
        else if( trgt.isstck && nav.at(-2).isholder )
        {
            trgthold    =nav.at(-2)

            nav =nav.slice(0,-1)
        }
        if( trgthold )
        {
		    trgthold.canadditem( this ,this.len ,nav )
        }
	}
}
