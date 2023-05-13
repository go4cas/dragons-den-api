import * as mod from "https://deno.land/x/deno_dom@v0.1.38/deno-dom-wasm.ts";

async function parseHTML(url = 'https://en.wikipedia.org/wiki/List_of_Dragons%27_Den_(British_TV_programme)_offers_Series_1-10') {
  const response = await fetch(url);
  const html = await response.text();
  
  const doc = new DOMParser().parseFromString(html, "text/html");

  const series = Array.from(doc.querySelectorAll('h3 span.mw-headline')).map(seriesElement => {
    let seriesName = seriesElement.textContent;
    let seriesTable = seriesElement.nextElementSibling?.nextElementSibling;
    
    const pitches = Array.from(seriesTable?.querySelectorAll('tr') || []).slice(1).map((pitchRow) => {
      const columns = Array.from(pitchRow.querySelectorAll('td')).map(td => td.textContent?.trim() || "");
      return {
        episode: columns[0],
        firstAired: columns[1],
        entrepreneur: columns[2],
        companyName: columns[3],
        moneyRequested: columns[4],
        equityGiven: columns[5],
        description: columns[6],
        investingDragons: columns[7],
        resultAfterFilming: columns[8],
        website: columns[9],
        fate: columns[10],
      }
    });

    return {
      seriesName,
      pitches
    };
  });

  console.log(series);
}

parseHTML('https://en.wikipedia.org/wiki/YOUR_WIKIPEDIA_PAGE');
