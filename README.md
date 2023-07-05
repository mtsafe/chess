# Chess

Play Chess against the AI of your choice

## Design Decisions

Since chess is very heavy in calculations, the calculation code is moved out of the App functional component.

### App level functions

App level functions should do at least one of these things: be passed as props, be used
to handle events, and set state variables.

App level functions that will be passed as props will be named ...Prop.
App level functions that handle events will be named handle{EventName}.

### State setting and directory

Calling a state setter should be done only once after calculations using that state variable are completed, because the state does not update immediately.

State directory is a collection of functions to do calculations on the parameters passed that resemble the state variables. The parameters are not mutated, but copies may be returned.

### Event handling

OnDrag, the possible moves are calculated for that piece and marked as dropzones. They are saved in state: dropTargetMoves.

OnDrop, the move is executed for that piece going to that location by updating the states of pieces1 and pieces2. Since the moves are checked OnDrag as possible, then the validity of the move does not need to be questioned. Just execute the move.
