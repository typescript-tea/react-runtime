import React from "react";
import {
  Program,
  Dispatch,
  runtime,
  EffectManager
} from "@typescript-tea/core";

export function reactRuntime<S, A>(
  program: Program<S, A, JSX.Element>,
  managers: ReadonlyArray<EffectManager<A>>
): React.ReactType {
  return function __runtimeRoot() {
    const [myState, setMyState] = React.useState<S | undefined>(undefined);
    const dispatchRef = React.useRef<Dispatch<A>>();
    React.useEffect(() => {
      const killProgram = runtime(
        {
          ...program,
          view: ({ state, dispatch }) => {
            dispatchRef.current = dispatch;
            setMyState(state);
          }
        },
        managers
      );
      return killProgram;
    }, []);
    return program.view && myState && dispatchRef.current ? (
      <program.view state={myState} dispatch={dispatchRef.current} />
    ) : null;
  };
}
