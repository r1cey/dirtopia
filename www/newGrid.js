import Ui from "./UIElement.js"


export default( Base =Ui )=>class Grid	extends Base
{
	gridels	=[]


	constructor( ...args )
	{
		super( ...args )
		
		this.el.classList.add( "grid" )
	
		this.gobj.fore(( item )=>
		{
			this.add( item )
		})
		/*this.sort()
		
		for(var gridel of this.gridels )
		{
			this.el.appendChild( gridel.el )
		}*/
	}


	add( grido )
	{
		this.gridels.push( grido.newgridel() )
	}



	sort()
	{
		this.gridels.sort(( a ,b )=> b.area - a.area )
	}
}