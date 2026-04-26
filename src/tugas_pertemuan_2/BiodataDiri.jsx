export default function BiodataDiri() {
    return (
        <div>
            {/* <UserCard>
                <Nama>
                    nama = "Arya Pangestu"
                </Nama>
                <Tentang>
                    tentang = "Saya adalah orang yang sangat ahli, dan sangat profesional"
                </Tentang>
                <Pendidikan>
                    pendidikan = "Politeknik Caltex Riau"
                </Pendidikan>
                <Skills>
                    skills = "Bertahan Hidup"
                </Skills>
                <Kontak>
                    kontak = "08kapan kita bertemu"
                </Kontak>
                <Hobi>
                    hobi = "Sky Diving"
                </Hobi>
            </UserCard> */}

            
            <UserCard>
                <h1>Biodata Diri</h1>
                <Nama nama="Arya Pangestu" />
                <Tentang tentang="Saya adalah orang yang sangat ahli, dan sangat profesional" />
                <Pendidikan pendidikan="Politeknik Caltex Riau" />
                <Skills skills="Bertahan Hidup" />
                <Kontak kontak="08kapan kita bertemu" />
                <Hobi hobi="Sky Diving" />
            </UserCard>
        

        </div>
    )
}

function UserCard(props){
    return (
        
        <div className = "card"> 
            {props.children}
        </div>
    )
}

function Nama(props){
    return (
        <div>
            <h3>Nama: {props.nama}</h3>
            <hr/>
        </div>
    )
}

function Tentang(props){
    return (
        <div>
            <p>Tentang Saya: {props.tentang}</p>
            <hr/>
        </div>
    )
}

function Pendidikan(props){
    return (
        <div>
            <p>Pendidikan: {props.pendidikan}</p>
            <hr/>
        </div>
    )
}

function Skills(props){
    return (
        <div>
            <p>Skills: {props.skills}</p>
            <hr/>
        </div>
    )
}

function Kontak(props){
    return (
        <div>
            <p>Kontak: {props.kontak}</p>
            <hr/>
        </div>
    )
}

function Hobi(props){
    return (
        <div>
            <p>Hobi: {props.hobi}</p>
            <hr/>
        </div>
    )
}