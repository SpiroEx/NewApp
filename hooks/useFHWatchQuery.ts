import FHT from "@/classes/templates/FHT";
import {
  QueryCompositeFilterConstraint,
  QueryFieldFilterConstraint,
} from "firebase/firestore";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

/**
 *   See Cielo for example
 */
export const useFHWatchQuery = <T extends { id: string }>(
  fht: FHT<T>,
  dependency: any[],
  // compoundQuery?: QueryCompositeFilterConstraint,
  ...query: QueryFieldFilterConstraint[]
): [T[], boolean, Dispatch<SetStateAction<boolean>>] => {
  const [obj, setObj] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    return fht.watchQuery(
      (obj) => {
        setObj(obj);
        setLoading(false);
      },
      // compoundQuery,
      undefined,
      ...query
    );
  }, [...dependency]);

  return [obj, loading, setLoading];
};
