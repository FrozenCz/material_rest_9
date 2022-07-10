import {EntityRepository, TreeRepository} from "typeorm";
import {Location} from "../models/location.entity";

@EntityRepository(Location)
export class LocationsRepository extends TreeRepository<Location> {

    async deleteLocation(location: Location) {
        const children = await this.findDescendants(location);
        /**
         * prvne musim odstranit zavislosti
         */
        const query = await this.createDescendantsQueryBuilder('location', 'locationClosure', location);

        await query.delete()
            .from('location_closure')
            .where('id_ancestor IN (:...ids)', {ids: children.map(ch => ch.id)})
            .execute()

        await this.remove(children.reverse());
    }

    async listLocations() {
        const locations = await this.findTrees();
        return locations;
    }
}
