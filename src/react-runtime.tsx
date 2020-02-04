import React from "react";
import {
  Program,
  Dispatch,
  runtime,
  EffectManager
} from "@typescript-tea/core";

/**
 * Use this to start a Program if you want to use React as the view library.
 */
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
    return program.view && myState !== undefined && dispatchRef.current ? (
      <program.view state={myState} dispatch={dispatchRef.current} />
    ) : null;
  };
}
