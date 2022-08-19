export const gaMeasurementId = process.env.NEXT_PUBLIC_GTAG || '';

export const pageview = () => {
  window.gtag('config', gaMeasurementId, {
    page_path: url,
  });
};