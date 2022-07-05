

export default function TravelPlanControl() {

  return (
    <div className={styles['travelplan__control']}>
      <div className={styles['travelplan__places']}>
        <label>
          <Typography variant="small" customStyles={{
              marginLeft: '5px'
          }}>
            Your current location: 
          </Typography>
        </label>
        <TextInputWithGooglePlaces 
          autocompleteInstance={api.autocomplete.geo} 
          onPlaceChange={onOriginPlaceChange}
          defaultLocation={placeOrigin}
          types={['(cities)']}
          customStyles={{
            borderRadius: '10px'
          }}
        />
      </div>

      <div className={styles['travelplan__places']}>
        <label>
            <Typography variant="small" customStyles={{
              marginLeft: '5px'
            }}>
              Current center: 
            </Typography>
          </label>
          <TextInputWithGooglePlaces 
            autocompleteInstance={api.autocomplete.center} 
            onPlaceChange={onPlaceChange}
            defaultLocation={placeCenter}
            types={['(cities)']}
            customStyles={{
              borderRadius: '10px'
            }}
          />
      </div>

      <div className={styles['travelplan__places']}>
        <label>
            <Typography variant="small" customStyles={{
              marginLeft: '5px'
            }}>
              Max travel distance
            </Typography>
          </label>
          <NumberInput 
            value={maxTravelDistance}
            onChange={onDistanceChange}
            customStyles={{
              borderRadius: '10px'
            }}
          />
      </div>
    </div>
  )
}