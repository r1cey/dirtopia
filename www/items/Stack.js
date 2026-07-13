import Item from "../shared/items/Item.js"
import newStack from "../shared/items/newStackable.js"

import GridSt   from "../ui/inv/CellItem.js"



export default class Stack  extends newStack( Item )
{
    ui_newgridc( daddiv )
    {
        return new GridSt( this ,daddiv )
    }


    dragto( trgt ,ui ,uito )
	{
        const holduifrom  =ui.gholdui()

        const holduito  =uito.gholdui()

        if( ! holduito || holduifrom === holduito )   return

        const navto =holduito.getnav()

        const canlen    =navto.at(-1).canadditem( this ,this.len ,navto )

        if( canlen > 0 )
        {
            holduifrom.delui( ui )

            holduito.adduifinal( ui )

            const navfrom   =holduifrom.getnav()

            navto[0].srv.send( "movitem" ,navfrom ,this ,canlen ,navto )
        }
	}
}
