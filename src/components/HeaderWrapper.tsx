"use client";

import { useState, useEffect, useCallback } from "react";
import PromoBar from "./PromoBar";
import Navbar from "./Navbar";

const PROMO_KEY = "gi_promo_v1";

export default function HeaderWrapper() {
  // Starts closed and only opens once we've checked sessionStorage on mount.
  // This is the single source of truth for promo visibility — both PromoBar
  // (what renders) and Navbar (how far down it sits) read from it, so they
  // can never disagree the way they could when each tracked this separately.
  const [promoVisible, setPromoVisible] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem(PROMO_KEY);
    setPromoVisible(!dismissed);
    setChecked(true);
  }, []);

  const handleDismiss = useCallback(() => {
    sessionStorage.setItem(PROMO_KEY, "1");
    setPromoVisible(false);
  }, []);

  return (
    <>
      {checked && <PromoBar visible={promoVisible} onDismiss={handleDismiss} />}
      <Navbar promoVisible={checked && promoVisible} />
    </>
  );
}
