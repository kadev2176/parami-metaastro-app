import React from 'react';
import style from './style.less';

const StoryModal: React.FC = () => {
  return (
    <div className={style.storyModal}>
      <div className={style.background}>
        <div className={style.backgroundTop} />
      </div>
      <div className={style.storyContainer}>
        <div className={style.title}>
          Para Metaverse Phase I
        </div>
        <div className={style.subTitle}>
          - Creation of the Primordial Gods
        </div>
        <div className={style.cover}>
          <img src="/images/background/phaseCover.png" alt="cover" />
        </div>
        <div className={style.content}>
          <p>
            Once upon a time, a *Type 7 celestial, by cultivating *paramis through millenniums, finally obtained the sacred energy of creation from the para metaverse. The celestial, therefore tunneled the energy through a *white hole, then a singularity big-banged into galaxies and stars. 366 Primordial Gods, each with a unique identity and soul-bound to a natal chart engraved with their own uniquely blended cosmic energy, were born.
          </p>
          <p>
            Each Primordial God is blessed with unique talents, a trinity frame of the three major arcana that make up a god’s body, mind and spirit. These gods are adorned with such divine attributes as courage, dominance, duality, justice and rule, in perfect astrological alignment with the harmony of the moon, stars and sun. Each god represents a snapshot of the universe for each one of the 366 days of the year, blessed with nature’s destined characteristics at this precise time in space.
          </p>
          <p>
            Billions of years after the big bang, the Primordial Gods decided to mint new souls to populate the metaverse. The 1st generation of new souls were gifted the power of re-creation, yet quickly realized that the power was finite, as the new generation could only recreate half the number of new souls compared to the previous generation….
          </p>
          <small>
            *Type 7 civilization: A further development based on Kardashev Scale. A type VII or K7 civilization would travel, transcend and ultimately oversee or &quot;be&quot; the Omniverse which is the collection of every single universe, multiverse, megaverse, paraverse, 11d dimension and 1st realm (reality). Everything is in the Omniverse, and there is only one Omniverse.
          </small>
          <small>
            * White Hole: In general relativity, a white hole is a hypothetical region of spacetime and singularity that cannot be entered from the outside - although energy-matter, light and information can escape from it. In this sense, it is the reverse of a black hole.
          </small>
          <small>
            *Parami is abstracted from parama with the meaning of completeness or the highest state possible, hence &quot;perfection.&quot; This perfection is applied to the qualities needed for one to attain awakening. One needs to cultivate and perfect a particular set of qualities—often over multiple lifetimes. These are the ten paramis: giving, virtue, renunciation, wisdom, energy, patience, truthfulness, determination, lovingkindness, and equanimity.
          </small>
        </div>
      </div>
    </div>
  )
}

export default StoryModal;
