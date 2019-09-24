import React from 'react'
import { Segment } from 'semantic-ui-react';
import GoogleMapReact from 'google-map-react';
import { Icon } from 'semantic-ui-react';

const Marker = () => <Icon name='marker' color='red' />;

const QuestionDetailMap = ({ lat, lng }) => {
    const zoom = 14;
    return (
        <Segment attached='bottom' style={{padding: 0}}>
            <div style={{ height: '300px', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyC4D1LiEjXq9Gw_Jx4m0fk1vfKwb6frWiI' }}
                    defaultCenter={{lat, lng}}
                    defaultZoom={zoom}
                >
                    <Marker
                        lat={lat}
                        lng={lng}
                    />
                </GoogleMapReact>
            </div>
        </Segment>
    )
}

export default QuestionDetailMap
