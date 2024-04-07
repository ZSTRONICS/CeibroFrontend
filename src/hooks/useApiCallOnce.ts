import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { AnyAction } from "redux";

const useApiCallOnce = (action: AnyAction, dependency: any[]) => {
  const isRenderEffect = useRef<boolean>(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isRenderEffect.current) {
      isRenderEffect.current = false;
    } else {
      dispatch(action);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependency);

  // Cleanup effect
  useEffect(() => {
    return () => {
      isRenderEffect.current = true;
    };
  }, []);

  useEffect(() => {
    dispatch(action);
  }, []);
};

export default useApiCallOnce;
