import Header from "../components/Header";
import Button from "../components/Button";
import Badge from "../components/Badge";
import Avatar from "../components/Avatar";
import Container from "../components/Container";
import Footer from "../components/Footer";
import Card from "../components/Card";  

export default function Components() {
  return (
    <div>
      <div className="p-5">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Buttons</h2>
        <div className="flex items-center gap-3 mb-8">
          <Button type="primary">Utama</Button>
          <Button type="login">Login</Button>
        </div>
       </div>

       <div>
        <h2 className="text-xl font-bold text-slate-800 mb-4">Badges</h2>
         <div className="flex items-center gap-3 mb-8">
            <Badge type="primary" />
            <Badge type="secondary" />
            <Badge type="selesai" />
            <Badge type="habis" />
         </div>
       </div>

       <div>
        <h2 className="text-xl font-bold text-slate-800 mb-4">Avatars</h2>
         <div className="flex items-center gap-3 mb-8">

        <Avatar name="Arya"/>
       </div>
    </div>

        <Container className="bg-gray-100">
            <h1 className="text-3xl font-bold mb-4">
                Ringkasan klinik
            </h1>

            <p className="text-gray-600">
                Pantau kesehatan Anabul hari ini secara real-time.
            </p>
        </Container>

<Footer />

<Card>
		<h2 className="text-xl font-bold">Pasien Hewan</h2>
		<p className="text-gray-600">Info Pasien</p>
</Card>
    </div>
  );
}