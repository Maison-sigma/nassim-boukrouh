// tweaks.jsx — Tweaks panel for nassimboukrouh.com prototype

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "tagline": "devenir",
  "heroVariant": "split",
  "accent": "#E85D29",
  "showPlaceholderLabels": true
}/*EDITMODE-END*/;

function NassimTweaks() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => { window.__nassim?.setTagline(t.tagline); }, [t.tagline]);
  React.useEffect(() => { window.__nassim?.setHeroVariant(t.heroVariant); }, [t.heroVariant]);
  React.useEffect(() => { window.__nassim?.setAccent(t.accent); }, [t.accent]);
  React.useEffect(() => {
    document.querySelectorAll('.ph__label').forEach(el => {
      el.style.display = t.showPlaceholderLabels ? '' : 'none';
    });
  }, [t.showPlaceholderLabels]);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Hero" />
      <TweakSelect
        label="Tagline"
        value={t.tagline}
        options={[
          { value: "devenir",  label: "Devenir marchand de biens" },
          { value: "triade",   label: "Apprendre. Sourcer. Co-investir." },
          { value: "ensemble", label: "Marchand de biens, ensemble." },
          { value: "reseau",   label: "Le réseau qui opère avec ses membres." },
        ]}
        onChange={v => setTweak('tagline', v)}
      />
      <TweakRadio
        label="Hero layout"
        value={t.heroVariant}
        options={["split", "centered", "full-bleed"]}
        onChange={v => setTweak('heroVariant', v)}
      />

      <TweakSection label="Accent" />
      <TweakColor
        label="Couleur"
        value={t.accent}
        options={["#E85D29", "#FF7A41", "#D34A1F", "#C77A2A"]}
        onChange={v => setTweak('accent', v)}
      />

      <TweakSection label="Production" />
      <TweakToggle
        label="Légendes placeholders"
        value={t.showPlaceholderLabels}
        onChange={v => setTweak('showPlaceholderLabels', v)}
      />
    </TweaksPanel>
  );
}

ReactDOM.createRoot(document.getElementById('tweaks-root')).render(<NassimTweaks />);
