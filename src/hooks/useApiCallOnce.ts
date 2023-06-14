import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { AnyAction } from "redux";

const useApiCallOnce = (action: AnyAction, dependency: any[]) => {
  const isRenderEffect = useRef<boolean>(false);
  const dispatch = useDispatch();
  useEffect(() => {
    // if (!isRenderEffect.current) {
    dispatch(action);
    // }

    // return () => {
    //   isRenderEffect.current = true;
    // };
  }, dependency);
};

export default useApiCallOnce;
