import GridHold from "./CellGrid.js"


export default class GridContainer extends GridHold
{
    constructor( holder ,dad ,griduis )
	{
		super( holder ,dad ,griduis )
		
	}



    finalize()
    {
        super.finalize()
    }


    starterarea()
    {
        return 1
    }
}